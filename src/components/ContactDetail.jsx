import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../db';

const ContactDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContact();
  }, [id]);

  const fetchContact = async () => {
    try {
      const contactRef = doc(db, 'contacts', id);
      const contactSnap = await getDoc(contactRef);
      
      if (contactSnap.exists()) {
        setContact({ id: contactSnap.id, ...contactSnap.data() });
      } else {
        setContact(null);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching contact:', error);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await deleteDoc(doc(db, 'contacts', id));
        navigate('/');
      } catch (error) {
        console.error('Error deleting contact:', error);
        alert('Error deleting contact');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading contact...</div>;
  }

  if (!contact) {
    return (
      <div className="error-page">
        <h2>Contact not found</h2>
        <Link to="/" className="back-button">Back to Contacts</Link>
      </div>
    );
  }

  return (
    <div className="contact-detail">
      <div className="header">
        <Link to="/" className="back-button">← Back to Contacts</Link>
        <div className="actions">
          <Link to={`/edit/${id}`} className="edit-button">Edit</Link>
          <button onClick={handleDelete} className="delete-button">Delete</button>
        </div>
      </div>

      <div className="contact-info-detail">
        <div className="contact-avatar-large">
          {contact.firstName?.[0]}{contact.lastName?.[0]}
        </div>
        
        <h1>{contact.firstName} {contact.lastName}</h1>
        
        <div className="contact-fields">
          <div className="field">
            <label>Email:</label>
            <p>{contact.email}</p>
          </div>
          
          {contact.phone && (
            <div className="field">
              <label>Phone:</label>
              <p>{contact.phone}</p>
            </div>
          )}
          
          {contact.address && (
            <div className="field">
              <label>Address:</label>
              <p>{contact.address}</p>
            </div>
          )}
          
          {contact.company && (
            <div className="field">
              <label>Company:</label>
              <p>{contact.company}</p>
            </div>
          )}
          
          {contact.notes && (
            <div className="field">
              <label>Notes:</label>
              <p>{contact.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;
