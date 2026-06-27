import Ticket from "../models/Ticket.js";
import User from "../models/User.js";

export const assignTicket = async (req, res) => {
  try {
    const { assignedTo } = req.body;

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    const supportAgent = await User.findById(assignedTo);

    if (!supportAgent) {
      return res.status(404).json({
        success: false,
        message: "Support Agent not found",
      });
    }

    if (
      supportAgent.role !== "SupportAgent" &&
      supportAgent.role !== "Admin"
    ) {
      return res.status(400).json({
        success: false,
        message: "User cannot be assigned tickets",
      });
    }

    ticket.assignedTo = assignedTo;
    ticket.status = "In Progress";

    await ticket.save();

    const updatedTicket = await Ticket.findById(ticket._id)
      .populate("createdBy", "name email role")
      .populate("reportedFor", "name email role")
      .populate("assignedTo", "name email role");

    res.json({
      success: true,
      message: "Ticket assigned successfully",
      ticket: updatedTicket,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createTicket = async (req, res) => {
  try {
    const {
        title,
        description,
        category,
        priority,
        reportedFor,
        } = req.body;

    if (
        (req.user.role === "Admin" ||
            req.user.role === "SupportAgent") &&
        reportedFor
        ) {
        const user = await User.findById(reportedFor);

        if (!user) {
            return res.status(404).json({
            success: false,
            message: "Reported user not found",
            });
        }
    }

    const ticket = await Ticket.create({
      title,
      description,
      category,
      priority,

      createdBy: req.user._id,

      reportedFor:
        req.user.role === "Employee"
            ? req.user._id
            : reportedFor || req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Ticket created successfully",
      ticket,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTickets = async (req, res) => {
  try {
    let tickets;

    if (req.user.role === "Admin") {

        tickets = await Ticket.find()
            .populate("createdBy", "name email role")
            .populate("reportedFor", "name email role")
            .populate("assignedTo", "name email role");

    }
    else if (req.user.role === "SupportAgent") {

        tickets = await Ticket.find({
            assignedTo: req.user._id,
        })
            .populate("createdBy", "name email role")
            .populate("reportedFor", "name email role")
            .populate("assignedTo", "name email role");

    }
    else {

        tickets = await Ticket.find({
            $or: [
                { createdBy: req.user._id },
                { reportedFor: req.user._id },
            ],
        })
            .populate("createdBy", "name email role")
            .populate("reportedFor", "name email role")
            .populate("assignedTo", "name email role");

    }

    res.status(200).json({
      success: true,
      count: tickets.length,
      tickets,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate("createdBy", "name email role")
      .populate("reportedFor", "name email role")
      .populate("assignedTo", "name email role")
      .populate("comments.author", "name role");

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    // Admin can access everything
    if (req.user.role !== "Admin") {
      const isOwner =
        ticket.createdBy._id.toString() === req.user._id.toString() ||
        ticket.reportedFor._id.toString() === req.user._id.toString();

      if (!isOwner) {
        return res.status(403).json({
          success: false,
          message: "Access denied",
        });
      }
    }

    res.status(200).json({
      success: true,
      ticket,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateTicket = async (req, res) => {
  try {

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    const isAdmin = req.user.role === "Admin";

    const isSupportAgent =
      req.user.role === "SupportAgent" &&
      ticket.assignedTo &&
      ticket.assignedTo.toString() === req.user._id.toString();

    const isOwner =
      ticket.reportedFor.toString() === req.user._id.toString();

    if (!isAdmin && !isSupportAgent && !isOwner) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const updates = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      priority: req.body.priority,
    };

    if (
      req.user.role === "Admin" ||
      req.user.role === "SupportAgent"
    ) {
      updates.status = req.body.status;
      updates.assignedTo = req.body.assignedTo;
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("createdBy", "name email role")
      .populate("reportedFor", "name email role")
      .populate("assignedTo", "name email role");

    res.json({
      success: true,
      ticket: updatedTicket,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const addComment = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Comment cannot be empty",
      });
    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    // Only Admin, SupportAgent, or the employee who owns the ticket
    const canComment =
      req.user.role === "Admin" ||
      req.user.role === "SupportAgent" ||
      ticket.reportedFor.toString() === req.user._id.toString();

    if (!canComment) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to comment on this ticket",
      });
    }

    ticket.comments.push({
      author: req.user._id,
      message,
    });

    await ticket.save();

    const updatedTicket = await Ticket.findById(ticket._id)
      .populate("createdBy", "name email role")
      .populate("reportedFor", "name email role")
      .populate("assignedTo", "name email role")
      .populate("comments.author", "name role");

    res.status(200).json({
      success: true,
      message: "Comment added successfully",
      ticket: updatedTicket,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const dashboardStats = async (req, res) => {
  try {
    const totalTickets = await Ticket.countDocuments();

    const open = await Ticket.countDocuments({
      status: "Open",
    });

    const inProgress = await Ticket.countDocuments({
      status: "In Progress",
    });

    const resolved = await Ticket.countDocuments({
      status: "Resolved",
    });

    const closed = await Ticket.countDocuments({
      status: "Closed",
    });

    res.json({
      success: true,
      stats: {
        totalTickets,
        open,
        inProgress,
        resolved,
        closed,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const closeTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    ticket.status = "Closed";

    await ticket.save();

    res.json({
      success: true,
      message: "Ticket closed successfully",
      ticket,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};