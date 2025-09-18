import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://exam-hero-server.vercel.app";

const ContactMessageAdmin = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // ✅ Format date helper
  const formatDate = useCallback((dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  }, []);

  // ✅ Fetch contacts from backend
  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_BASE_URL}/contacts`);
      setContacts(data);
      setError("");
    } catch (err) {
      console.error("Failed to fetch contacts:", err);
      setError("Failed to load contact messages. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  // ✅ Delete contact
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/contacts/${id}`);
      setContacts((prev) => prev.filter((c) => c._id !== id));
      setSuccess("Contact message deleted successfully ✅");
    } catch (err) {
      console.error("Failed to delete contact:", err);
      setError("Failed to delete contact message ❌");
    } finally {
      setTimeout(() => setSuccess(""), 3000);
      setTimeout(() => setError(""), 3000);
    }
  };

  // ✅ Mark as read/unread
  const toggleReadStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "read" ? "unread" : "read";
      await axios.patch(`${API_BASE_URL}/contacts/${id}/status`, {
        status: newStatus,
      });

      setContacts((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
      );

      setSuccess(`Marked as ${newStatus}`);
    } catch (err) {
      console.error("Failed to update status:", err);
      setError("Failed to update status ❌");
    } finally {
      setTimeout(() => setSuccess(""), 2000);
      setTimeout(() => setError(""), 3000);
    }
  };

  // ✅ Filter & sort contacts
  const filteredContacts = useMemo(() => {
    return contacts
      .filter((contact) => {
        const search = searchTerm.toLowerCase();
        const matchesSearch =
          contact.name?.toLowerCase().includes(search) ||
          contact.email?.toLowerCase().includes(search) ||
          contact.message?.toLowerCase().includes(search);

        const matchesFilter =
          filterStatus === "all" || contact.status === filterStatus;

        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => {
        if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
        if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
        if (sortBy === "name") return a.name?.localeCompare(b.name);
        return 0;
      });
  }, [contacts, searchTerm, filterStatus, sortBy]);

  // ✅ View contact details
  const viewContactDetails = (contact) => {
    setSelectedContact(contact);
    if (contact.status === "unread") {
      toggleReadStatus(contact._id, "unread");
    }
  };

  // ✅ Close modal & reset selected contact
  const closeModal = () => setSelectedContact(null);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4 text-lg">Loading contact messages...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          Contact Messages
        </h2>
        <div className="flex items-center space-x-4">
          <button onClick={fetchContacts} className="btn btn-outline btn-primary">
            🔄 Refresh
          </button>
          <span className="badge badge-lg badge-neutral">
            {filteredContacts.length} of {contacts.length} messages
          </span>
        </div>
      </div>

      {/* Status Messages */}
      {error && <div className="alert alert-error mb-4">{error}</div>}
      {success && <div className="alert alert-success mb-4">{success}</div>}

      {/* Filters */}
      <div className="bg-base-200 p-6 rounded-lg mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered flex-1"
        />

        <select
          className="select select-bordered"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Messages</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
        </select>

        <select
          className="select select-bordered"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="name">By Name</option>
        </select>
      </div>

      {/* Contact List */}
      <div className="grid gap-4">
        {filteredContacts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No contact messages found</p>
            {(searchTerm || filterStatus !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterStatus("all");
                }}
                className="btn btn-ghost mt-3"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          filteredContacts.map((contact) => (
            <div
              key={contact._id}
              className={`card bg-base-100 shadow-lg hover:shadow-xl cursor-pointer ${
                contact.status === "unread" ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => viewContactDetails(contact)}
            >
              <div className="card-body p-4">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <h3 className="card-title">{contact.name}</h3>
                    <p className="text-sm text-gray-500">{contact.email}</p>
                    <p className="mt-2 line-clamp-2">
                      {contact.message?.length > 100
                        ? contact.message.slice(0, 100) + "..."
                        : contact.message}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className="text-sm text-gray-400">
                      {formatDate(contact.createdAt)}
                    </span>
                    <div className="flex gap-2">
                      <button
                        className={`btn btn-sm ${
                          contact.status === "read"
                            ? "btn-outline"
                            : "btn-primary"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleReadStatus(contact._id, contact.status);
                        }}
                      >
                        {contact.status === "read" ? "Read" : "Unread"}
                      </button>
                      <button
                        className="btn btn-sm btn-error btn-outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(contact._id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Contact Details Modal */}
      {selectedContact && (
        <div className="modal modal-open">
          <div className="modal-box max-w-3xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Message Details</h3>
              <button className="btn btn-sm btn-circle btn-ghost" onClick={closeModal}>
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <p className="font-semibold">Name</p>
                  <div className="p-3 bg-base-200 rounded-lg">{selectedContact.name}</div>
                </div>
                <div className="flex-1">
                  <p className="font-semibold">Email</p>
                  <div className="p-3 bg-base-200 rounded-lg">
                    <a href={`mailto:${selectedContact.email}`} className="link link-primary">
                      {selectedContact.email}
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-semibold">Date</p>
                <div className="p-3 bg-base-200 rounded-lg">
                  {formatDate(selectedContact.createdAt)}
                </div>
              </div>

              <div>
                <p className="font-semibold">Message</p>
                <div className="p-4 bg-base-200 rounded-lg whitespace-pre-wrap">
                  {selectedContact.message}
                </div>
              </div>
            </div>

            <div className="modal-action">
              <button
                className="btn btn-outline"
                onClick={() =>
                  toggleReadStatus(selectedContact._id, selectedContact.status)
                }
              >
                Mark as{" "}
                {selectedContact.status === "read" ? "Unread" : "Read"}
              </button>
              <button
                className="btn btn-error"
                onClick={() => handleDelete(selectedContact._id)}
              >
                Delete Message
              </button>
              <button className="btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactMessageAdmin;
