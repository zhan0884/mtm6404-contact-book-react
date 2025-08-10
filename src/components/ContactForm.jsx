import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, addDoc, updateDoc, collection } from 'firebase/firestore';
import { db } from '../db';

const ContactForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    company: '',
    notes: ''
  });
  
  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isEditing) {
      fetchContact();
    }
  }, [id]);

  const fetchContact = async () => {
    try {
      const contactRef = doc(db, 'contacts', id);
      const contactSnap = await getDoc(contactRef);
      
      if (contactSnap.exists()) {
        setFormData(contactSnap.data());
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching contact:', error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
      alert('First name, last name, and email are required fields.');
      return;
    }

    setSubmitting(true);
    
    try {
      if (isEditing) {
        // Update existing contact
        await updateDoc(doc(db, 'contacts', id), formData);
        navigate(`/contact/${id}`);
      } else {
        // Add new contact
        const docRef = await addDoc(collection(db, 'contacts'), formData);
        navigate(`/contact/${docRef.id}`);
      }
    } catch (error) {
      console.error('Error saving contact:', error);
      alert('Error saving contact');
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading contact...</div>;
  }

  return (
    <div className="contact-form">
      <div className="header">
        <h1>{isEditing ? 'Edit Contact' : 'Add New Contact'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="firstName">First Name *</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name *</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-textarea"
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="form-textarea"
            rows="4"
          />
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            onClick={() => navigate('/')} 
            className="cancel-button"
            disabled={submitting}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="save-button"
            disabled={submitting}
          >
            {submitting ? 'Saving...' : (isEditing ? 'Update Contact' : 'Add Contact')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
