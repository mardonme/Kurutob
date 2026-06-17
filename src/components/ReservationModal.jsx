import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Icon from "./ui/Icon";

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

  const modalRef = useRef(null);
  const firstFieldRef = useRef(null);
  const previouslyFocusedRef = useRef(null);

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

  // Body scroll-lock + focus management + restore focus on close
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedRef.current = document.activeElement;
    document.body.style.overflow = "hidden";

    // Focus the first field once the panel mounts
    const focusTimer = window.setTimeout(() => {
      firstFieldRef.current?.focus();
    }, 0);

    return () => {
      window.clearTimeout(focusTimer);
      // Restore focus to the element that opened the modal
      const prev = previouslyFocusedRef.current;
      if (prev && typeof prev.focus === "function") {
        prev.focus();
      }
    };
  }, [isOpen]);

  // Escape-to-close + Tab focus trap (document-level keydown)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && !isSubmitting) {
        e.preventDefault();
        handleClose();
        return;
      }

      if (e.key === "Tab") {
        const panel = modalRef.current;
        if (!panel) return;

        const focusable = panel.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;

        if (e.shiftKey) {
          if (active === first || !panel.contains(active)) {
            e.preventDefault();
            last.focus();
          }
        } else if (active === last || !panel.contains(active)) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, isSubmitting]);

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
      const phoneRegex = /^[\d\s+\-()]{10,}$/;
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
New Reservation
Name: ${formData.name}
Phone: ${formData.phone}
People: ${formData.people}
Date: ${formData.date}
Time: ${formData.time}
Comment: ${formData.comment || "-"}
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

  // Get today's date for min date attribute
  const today = new Date().toISOString().split("T")[0];

  return (
    <div
      className="reservation-overlay"
      onClick={handleClose}
      role="presentation"
    >
      <div
        className="reservation-modal"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="reservation-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="reservation-close"
          onClick={handleClose}
          disabled={isSubmitting}
          aria-label="Close reservation dialog"
        >
          <Icon name="close" size={20} />
        </button>

        <div className="reservation-header">
          <span className="reservation-eyebrow">
            <Icon name="utensils" size={14} />
            Reservations
          </span>
          <h2 id="reservation-title" className="reservation-title">
            Book a <em>Table</em>
          </h2>
          <p className="reservation-subtitle">
            Reserve your seat for an authentic Tajik dining experience.
          </p>
        </div>

        {submitStatus === "success" ? (
          <div className="reservation-feedback" role="status" aria-live="polite">
            <span className="reservation-feedback__icon reservation-feedback__icon--success">
              <Icon name="checkCircle" size={56} strokeWidth={1.4} />
            </span>
            <h3 className="reservation-feedback__title">Reservation Submitted</h3>
            <p className="reservation-feedback__text">
              We&rsquo;ll confirm your booking shortly.
            </p>
          </div>
        ) : submitStatus === "error" ? (
          <div
            className="reservation-feedback"
            role="alert"
            aria-live="assertive"
          >
            <span className="reservation-feedback__icon reservation-feedback__icon--error">
              <Icon name="alert" size={56} strokeWidth={1.4} />
            </span>
            <h3 className="reservation-feedback__title">Something Went Wrong</h3>
            <p className="reservation-feedback__text">
              Please try again or contact us directly.
            </p>
            <button
              type="button"
              className="btn btn--secondary reservation-retry"
              onClick={() => setSubmitStatus(null)}
            >
              Try Again
            </button>
          </div>
        ) : (
          <form
            className="reservation-form"
            onSubmit={submitReservation}
            noValidate
          >
            <div className="reservation-field">
              <label htmlFor="res-name">Name *</label>
              <input
                ref={firstFieldRef}
                type="text"
                id="res-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className={errors.name ? "is-invalid" : ""}
                disabled={isSubmitting}
                autoComplete="name"
                aria-invalid={errors.name ? "true" : undefined}
                aria-describedby={errors.name ? "res-name-error" : undefined}
              />
              {errors.name && (
                <span id="res-name-error" className="reservation-error">
                  <Icon name="alert" size={13} strokeWidth={1.8} />
                  {errors.name}
                </span>
              )}
            </div>

            <div className="reservation-row">
              <div className="reservation-field">
                <label htmlFor="res-phone">Phone *</label>
                <input
                  type="tel"
                  id="res-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+998 90 123 45 67"
                  className={errors.phone ? "is-invalid" : ""}
                  disabled={isSubmitting}
                  autoComplete="tel"
                  aria-invalid={errors.phone ? "true" : undefined}
                  aria-describedby={
                    errors.phone ? "res-phone-error" : undefined
                  }
                />
                {errors.phone && (
                  <span id="res-phone-error" className="reservation-error">
                    <Icon name="alert" size={13} strokeWidth={1.8} />
                    {errors.phone}
                  </span>
                )}
              </div>

              <div className="reservation-field">
                <label htmlFor="res-people">Guests *</label>
                <input
                  type="number"
                  id="res-people"
                  name="people"
                  value={formData.people}
                  onChange={handleChange}
                  placeholder="2"
                  min="1"
                  max="50"
                  className={errors.people ? "is-invalid" : ""}
                  disabled={isSubmitting}
                  aria-invalid={errors.people ? "true" : undefined}
                  aria-describedby={
                    errors.people ? "res-people-error" : undefined
                  }
                />
                {errors.people && (
                  <span id="res-people-error" className="reservation-error">
                    <Icon name="alert" size={13} strokeWidth={1.8} />
                    {errors.people}
                  </span>
                )}
              </div>
            </div>

            <div className="reservation-row">
              <div className="reservation-field">
                <label htmlFor="res-date">Date *</label>
                <input
                  type="date"
                  id="res-date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={today}
                  className={errors.date ? "is-invalid" : ""}
                  disabled={isSubmitting}
                  aria-invalid={errors.date ? "true" : undefined}
                  aria-describedby={errors.date ? "res-date-error" : undefined}
                />
                {errors.date && (
                  <span id="res-date-error" className="reservation-error">
                    <Icon name="alert" size={13} strokeWidth={1.8} />
                    {errors.date}
                  </span>
                )}
              </div>

              <div className="reservation-field">
                <label htmlFor="res-time">Time *</label>
                <input
                  type="time"
                  id="res-time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className={errors.time ? "is-invalid" : ""}
                  disabled={isSubmitting}
                  aria-invalid={errors.time ? "true" : undefined}
                  aria-describedby={errors.time ? "res-time-error" : undefined}
                />
                {errors.time && (
                  <span id="res-time-error" className="reservation-error">
                    <Icon name="alert" size={13} strokeWidth={1.8} />
                    {errors.time}
                  </span>
                )}
              </div>
            </div>

            <div className="reservation-field">
              <label htmlFor="res-comment">Comment (optional)</label>
              <textarea
                id="res-comment"
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
              className="btn btn--primary btn--block reservation-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner" aria-hidden="true"></span>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  Confirm Reservation
                  <Icon name="arrowRight" size={16} />
                </>
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
          background: var(--c-scrim);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-5);
          animation: reservation-fade var(--dur) var(--ease);
        }

        @keyframes reservation-fade {
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
          max-width: 520px;
          max-height: calc(100vh - var(--space-7));
          overflow-y: auto;
          overscroll-behavior: contain;
          background: var(--c-surface-2);
          border: 1px solid var(--c-border-strong);
          border-radius: var(--radius-xl);
          padding: var(--space-7) var(--space-6);
          box-shadow: var(--shadow-lg);
          animation: reservation-rise var(--dur-slow) var(--ease-out);
        }

        @keyframes reservation-rise {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .reservation-close {
          position: absolute;
          top: var(--space-4);
          right: var(--space-4);
          width: 42px;
          height: 42px;
          background: var(--c-surface-3);
          border: 1px solid var(--c-border);
          border-radius: var(--radius-pill);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--c-text-2);
          cursor: pointer;
          transition: background var(--dur) var(--ease),
            border-color var(--dur) var(--ease), color var(--dur) var(--ease);
        }

        .reservation-close:hover:not(:disabled) {
          background: var(--c-gold-soft);
          border-color: var(--c-gold-line);
          color: var(--c-gold);
        }

        .reservation-close:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .reservation-header {
          text-align: center;
          margin-bottom: var(--space-6);
          padding-right: var(--space-6);
          padding-left: var(--space-6);
        }

        .reservation-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          font-family: var(--font-sans);
          font-size: var(--fs-xs);
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--c-gold);
          margin-bottom: var(--space-3);
        }

        .reservation-title {
          font-family: var(--font-display);
          font-size: var(--fs-h3);
          color: var(--c-text);
          font-weight: 700;
          line-height: 1.15;
        }

        .reservation-title em {
          font-style: italic;
          color: var(--c-gold);
        }

        .reservation-subtitle {
          font-family: var(--font-sans);
          font-size: var(--fs-sm);
          color: var(--c-text-2);
          margin-top: var(--space-2);
        }

        .reservation-form {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .reservation-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-4);
        }

        .reservation-field {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          min-width: 0;
        }

        .reservation-field label {
          font-family: var(--font-sans);
          font-size: var(--fs-xs);
          font-weight: 600;
          color: var(--c-text-2);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .reservation-field input,
        .reservation-field textarea {
          width: 100%;
          background: var(--c-surface-3);
          border: 1px solid var(--c-border);
          border-radius: var(--radius-md);
          padding: 13px 15px;
          color: var(--c-text);
          font-family: var(--font-sans);
          font-size: var(--fs-base);
          transition: border-color var(--dur) var(--ease),
            background var(--dur) var(--ease), box-shadow var(--dur) var(--ease);
        }

        .reservation-field input:focus,
        .reservation-field textarea:focus {
          outline: none;
          border-color: var(--c-gold);
          background: var(--c-elevated);
          box-shadow: 0 0 0 3px var(--c-gold-soft);
        }

        .reservation-field input.is-invalid {
          border-color: var(--c-error);
        }
        .reservation-field input.is-invalid:focus {
          box-shadow: 0 0 0 3px var(--c-error-soft);
        }

        .reservation-field input:disabled,
        .reservation-field textarea:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        .reservation-field textarea {
          resize: vertical;
          min-height: 84px;
        }

        .reservation-field input::placeholder,
        .reservation-field textarea::placeholder {
          color: var(--c-text-3);
        }

        .reservation-error {
          display: inline-flex;
          align-items: center;
          gap: var(--space-1);
          font-family: var(--font-sans);
          font-size: var(--fs-xs);
          color: var(--c-error);
        }

        .reservation-submit {
          margin-top: var(--space-2);
        }

        /* Feedback states (success / error) */
        .reservation-feedback {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: var(--space-5) 0 var(--space-3);
        }

        .reservation-feedback__icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: var(--space-4);
        }

        .reservation-feedback__icon--success {
          color: var(--c-success);
        }
        .reservation-feedback__icon--error {
          color: var(--c-error);
        }

        .reservation-feedback__title {
          font-family: var(--font-display);
          font-size: var(--fs-h3);
          color: var(--c-text);
          margin-bottom: var(--space-2);
        }

        .reservation-feedback__text {
          font-family: var(--font-sans);
          font-size: var(--fs-sm);
          color: var(--c-text-2);
        }

        .reservation-retry {
          margin-top: var(--space-5);
        }

        /* Native date/time picker theming */
        .reservation-field input[type="date"],
        .reservation-field input[type="time"] {
          color-scheme: dark;
        }

        .reservation-field input[type="date"]::-webkit-calendar-picker-indicator,
        .reservation-field input[type="time"]::-webkit-calendar-picker-indicator {
          filter: invert(0.7) sepia(1) saturate(3) hue-rotate(5deg);
          cursor: pointer;
        }

        @media (max-width: 640px) {
          .reservation-overlay {
            padding: var(--space-4);
          }

          .reservation-modal {
            padding: var(--space-6) var(--space-5);
            border-radius: var(--radius-lg);
            max-height: calc(100vh - var(--space-5));
          }

          .reservation-header {
            padding-right: var(--space-5);
            padding-left: var(--space-5);
          }

          .reservation-row {
            grid-template-columns: 1fr;
          }

          .reservation-close {
            top: var(--space-3);
            right: var(--space-3);
          }
        }
      `}</style>
    </div>
  );
};

export default ReservationModal;
