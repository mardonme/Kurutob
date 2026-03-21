import { useState } from "react";
import axios from "axios";

// Escape special characters for Telegram MarkdownV2
function escapeMarkdownV2(text) {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, "\\$&");
}

const ReservationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    people: "",
    date: "",
    time: "",
    comment: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  // Prevent duplicate submissions
  const [hasSubmitted, setHasSubmitted] = useState(false);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else {
      // Validate phone number (allows digits, spaces, +, -, parentheses)
      const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/;
      if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
        newErrors.phone = "Please enter a valid phone number";
      }
    }

    if (!formData.people) {
      newErrors.people = "Number of people is required";
    } else if (formData.people < 1 || formData.people > 50) {
      newErrors.people = "Please enter a number between 1 and 50";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = "Please select a future date";
      }
    }

    if (!formData.time) {
      newErrors.time = "Time is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const submitReservation = async (e) => {
    e.preventDefault();

    if (hasSubmitted) return;
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const text = `
🚀 New Order
👤 Name: ${formData.name}
📞 Phone: ${formData.phone}
👥 People: ${formData.people}
📅 Date: ${formData.date}
⏰ Time: ${formData.time}
📝 Comment: ${formData.comment || "-"}
`;

      const res = await axios.post(
        `https://olx-server-omega.vercel.app/api/message/chanel`,
        { content: escapeMarkdownV2(text), chanelId: "-1003021954153" },
      );

      console.log("Reservation submitted:", res.data);

      setSubmitStatus("success");
      setHasSubmitted(true);

      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error) {
      console.error("Reservation error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        name: "",
        phone: "",
        people: "",
        date: "",
        time: "",
        comment: "",
      });
      setErrors({});
      setSubmitStatus(null);
      setHasSubmitted(false);
      document.body.style.overflow = "";
      onClose();
    }
  };

  // Handle escape key to close
  const handleKeyDown = (e) => {
    if (e.key === "Escape" && !isSubmitting) {
      handleClose();
    }
  };

  // Get today's date for min date attribute
  const today = new Date().toISOString().split("T")[0];

  return (
    <div
      className="reservation-overlay"
      onClick={handleClose}
      onKeyDown={handleKeyDown}
    >
      <div className="reservation-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="reservation-close"
          onClick={handleClose}
          disabled={isSubmitting}
          aria-label="Close modal"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="reservation-header">
          <h2 className="reservation-title">Book a Table</h2>
          <p className="reservation-subtitle">
            Reserve your dining experience with us
          </p>
        </div>

        {submitStatus === "success" ? (
          <div className="reservation-success">
            <div className="success-icon">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <path d="M22 4L12 14.01l-3-3" />
              </svg>
            </div>
            <h3>Reservation Submitted!</h3>
            <p>We'll confirm your booking shortly.</p>
          </div>
        ) : submitStatus === "error" ? (
          <div className="reservation-error">
            <div className="error-icon">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M15 9l-6 6M9 9l6 6" />
              </svg>
            </div>
            <h3>Something went wrong</h3>
            <p>Please try again or contact us directly.</p>
            <button
              type="button"
              className="retry-btn"
              onClick={() => setSubmitStatus(null)}
            >
              Try Again
            </button>
          </div>
        ) : (
          <form className="reservation-form" onSubmit={submitReservation}>
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className={errors.name ? "error" : ""}
                disabled={isSubmitting}
              />
              {errors.name && (
                <span className="error-message">{errors.name}</span>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+998 90 123 45 67"
                  className={errors.phone ? "error" : ""}
                  disabled={isSubmitting}
                />
                {errors.phone && (
                  <span className="error-message">{errors.phone}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="people">Guests *</label>
                <input
                  type="number"
                  id="people"
                  name="people"
                  value={formData.people}
                  onChange={handleChange}
                  placeholder="2"
                  min="1"
                  max="50"
                  className={errors.people ? "error" : ""}
                  disabled={isSubmitting}
                />
                {errors.people && (
                  <span className="error-message">{errors.people}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Date *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={today}
                  className={errors.date ? "error" : ""}
                  disabled={isSubmitting}
                />
                {errors.date && (
                  <span className="error-message">{errors.date}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="time">Time *</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className={errors.time ? "error" : ""}
                  disabled={isSubmitting}
                />
                {errors.time && (
                  <span className="error-message">{errors.time}</span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="comment">Comment (optional)</label>
              <textarea
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                placeholder="Any special requests or preferences..."
                rows="3"
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  <span>Submitting...</span>
                </>
              ) : (
                "Confirm Reservation"
              )}
            </button>
          </form>
        )}
      </div>

      <style jsx>{`
        .reservation-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .reservation-modal {
          position: relative;
          width: 100%;
          max-width: 500px;
          background: linear-gradient(145deg, #1a180f, #0f0f0f);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 20px;
          padding: 40px 32px;
          animation: slideUp 0.4s ease;
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.6);
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .reservation-close {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 44px;
          height: 44px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #d4af37;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .reservation-close:hover:not(:disabled) {
          background: rgba(212, 175, 55, 0.15);
          transform: rotate(90deg);
        }

        .reservation-close:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .reservation-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .reservation-title {
          font-family: "Playfair Display", serif;
          font-size: 28px;
          color: #ffffff;
          font-weight: 700;
          margin-bottom: 8px;
          letter-spacing: 1px;
        }

        .reservation-subtitle {
          font-family: "Jost", sans-serif;
          font-size: 14px;
          color: #888888;
          letter-spacing: 0.5px;
        }

        .reservation-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-family: "Jost", sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #d4af37;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .form-group input,
        .form-group textarea {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(212, 175, 55, 0.15);
          border-radius: 12px;
          padding: 14px 16px;
          color: #e8dfc8;
          font-family: "Jost", sans-serif;
          font-size: 15px;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #d4af37;
          background: rgba(212, 175, 55, 0.05);
        }

        .form-group input.error {
          border-color: #ff4d4d;
        }

        .form-group input:disabled,
        .form-group textarea:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .form-group textarea {
          resize: none;
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: rgba(232, 223, 200, 0.4);
        }

        .error-message {
          font-family: "Jost", sans-serif;
          font-size: 12px;
          color: #ff4d4d;
          margin-top: -4px;
        }

        .submit-btn {
          margin-top: 8px;
          background: linear-gradient(135deg, #d4a017, #c9a227);
          color: #0e0d08;
          border: none;
          padding: 16px 24px;
          border-radius: 12px;
          font-family: "Jost", sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .submit-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #e8b42a, #d4a017);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(212, 160, 23, 0.3);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(14, 13, 8, 0.3);
          border-top-color: #0e0d08;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* Success state */
        .reservation-success,
        .reservation-error {
          text-align: center;
          padding: 20px 0;
        }

        .success-icon {
          color: #4ade80;
          margin-bottom: 20px;
          animation: scaleIn 0.4s ease;
        }

        .error-icon {
          color: #ff4d4d;
          margin-bottom: 20px;
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .reservation-success h3,
        .reservation-error h3 {
          font-family: "Playfair Display", serif;
          font-size: 24px;
          color: #ffffff;
          margin-bottom: 8px;
        }

        .reservation-success p,
        .reservation-error p {
          font-family: "Jost", sans-serif;
          font-size: 14px;
          color: #888888;
        }

        .retry-btn {
          margin-top: 20px;
          background: rgba(212, 175, 55, 0.1);
          color: #d4af37;
          border: 1px solid rgba(212, 175, 55, 0.3);
          padding: 12px 24px;
          border-radius: 8px;
          font-family: "Jost", sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .retry-btn:hover {
          background: rgba(212, 175, 55, 0.2);
        }

        /* Date and time input styling */
        input[type="date"],
        input[type="time"] {
          color-scheme: dark;
        }

        input[type="date"]::-webkit-calendar-picker-indicator,
        input[type="time"]::-webkit-calendar-picker-indicator {
          filter: invert(1) brightness(0.7);
          cursor: pointer;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .reservation-modal {
            padding: 32px 24px;
            border-radius: 16px;
          }

          .reservation-title {
            font-size: 24px;
          }

          .form-row {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .reservation-overlay {
            padding: 16px;
          }

          .reservation-close {
            top: 16px;
            right: 16px;
            width: 40px;
            height: 40px;
          }
        }
      `}</style>
    </div>
  );
};

export default ReservationModal;
