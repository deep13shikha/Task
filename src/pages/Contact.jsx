import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Hotel Information
    hotelName: '',
    city: '',
    state: '',
    
    // Event Details
    eventType: '',
    eventDate: '',
    guestCount: '',
    budget: '',
    
    // Event Requirements
    venueType: '',
    servicesNeeded: [],
    specialRequirements: '',
    
    // Contact Preference
    contactMethod: '',
    bestTime: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const eventTypes = [
    'Wedding',
    'Corporate Event',
    'Birthday Party',
    'Conference',
    'Product Launch',
    'Social Gathering',
    'Other'
  ];

  const services = [
    { id: 'venue', name: 'Venue Booking', icon: '🏛️' },
    { id: 'catering', name: 'Catering', icon: '🍽️' },
    { id: 'decorations', name: 'Decorations', icon: '🎨' },
    { id: 'entertainment', name: 'Entertainment', icon: '🎭' },
    { id: 'photography', name: 'Photography/Videography', icon: '📸' },
    { id: 'audiovisual', name: 'Audio-Visual Equipment', icon: '🔊' },
    { id: 'transportation', name: 'Transportation', icon: '🚗' },
    { id: 'accommodation', name: 'Accommodation', icon: '🏨' },
    { id: 'marketing', name: 'Marketing/Promotion', icon: '📢' }
  ];

  const contactMethods = [
    { value: 'email', label: '📧 Email' },
    { value: 'phone', label: '📞 Phone Call' },
    { value: 'whatsapp', label: '💬 WhatsApp' },
    { value: 'any', label: '✅ Any Method' }
  ];

  const bestTimes = [
    { value: 'morning', label: '🌅 Morning (9AM-12PM)' },
    { value: 'afternoon', label: '☀️ Afternoon (12PM-5PM)' },
    { value: 'evening', label: '🌙 Evening (5PM-8PM)' },
    { value: 'anytime', label: '⏰ Anytime' }
  ];

  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) newErrors[name] = 'This field is required';
        else if (value.length < 2) newErrors[name] = 'Must be at least 2 characters';
        else delete newErrors[name];
        break;
      case 'email':
        if (!value) newErrors[name] = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) newErrors[name] = 'Invalid email format';
        else delete newErrors[name];
        break;
      case 'phone':
        if (!value) newErrors[name] = 'Phone number is required';
        else if (!/^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/[\s\-\(\)]/g, ''))) newErrors[name] = 'Invalid phone number';
        else delete newErrors[name];
        break;
      case 'hotelName':
        if (!value.trim()) newErrors[name] = 'Hotel name is required';
        else delete newErrors[name];
        break;
      case 'city':
        if (!value.trim()) newErrors[name] = 'City is required';
        else delete newErrors[name];
        break;
      case 'state':
        if (!value) newErrors[name] = 'State is required';
        else delete newErrors[name];
        break;
      case 'eventType':
        if (!value) newErrors[name] = 'Please select event type';
        else delete newErrors[name];
        break;
      case 'eventDate':
        if (!value) newErrors[name] = 'Event date is required';
        else if (new Date(value) < new Date()) newErrors[name] = 'Event date must be in the future';
        else delete newErrors[name];
        break;
      case 'guestCount':
        if (!value) newErrors[name] = 'Number of guests is required';
        else if (value < 1) newErrors[name] = 'Must be at least 1 guest';
        else if (value > 10000) newErrors[name] = 'Maximum 10,000 guests';
        else delete newErrors[name];
        break;
      default:
        delete newErrors[name];
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      const updatedServices = checked 
        ? [...formData.servicesNeeded, value]
        : formData.servicesNeeded.filter(service => service !== value);
      
      setFormData(prev => ({
        ...prev,
        servicesNeeded: updatedServices
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      if (touched[name]) {
        validateField(name, value);
      }
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);
    
    // Validate all fields
    const isValid = Object.keys(formData).every(key => validateField(key, formData[key]));
    
    if (!isValid) {
      alert('Please fix the errors before submitting');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted:', formData);
      alert('🎉 Thank you for your inquiry! We will contact you within 24 hours.');
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        hotelName: '',
        city: '',
        state: '',
        eventType: '',
        eventDate: '',
        guestCount: '',
        budget: '',
        venueType: '',
        servicesNeeded: [],
        specialRequirements: '',
        contactMethod: '',
        bestTime: ''
      });
      setTouched({});
      setErrors({});
    } catch (error) {
      alert('❌ There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Enhanced inline styles with top padding
  const styles = {
    outerContainer: {
      minHeight: '100vh',
      padding: '80px 20px 40px', // Added top padding here
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center'
    },
    container: {
      maxWidth: '900px',
      width: '100%',
      margin: '0 auto',
      padding: '40px 30px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '20px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    innerContainer: {
      background: 'white',
      borderRadius: '15px',
      padding: '40px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
    },
    heading: {
      textAlign: 'center',
      color: '#2c3e50',
      marginBottom: '10px',
      fontSize: '2.5rem',
      fontWeight: '700',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    subtitle: {
      textAlign: 'center',
      color: '#7f8c8d',
      fontSize: '1.2rem',
      marginBottom: '15px',
      fontWeight: '300'
    },
    mandatoryNote: {
      textAlign: 'center',
      color: '#e74c3c',
      fontSize: '14px',
      marginBottom: '40px',
      fontWeight: '500',
      padding: '10px',
      backgroundColor: '#ffeaa7',
      borderRadius: '8px',
      border: '1px solid #fdcb6e'
    },
    formSection: {
      marginBottom: '35px',
      padding: '30px',
      border: 'none',
      borderRadius: '15px',
      background: 'linear-gradient(145deg, #f8f9fa, #e9ecef)',
      boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.1), -5px -5px 15px rgba(255, 255, 255, 0.7)',
      position: 'relative',
      overflow: 'hidden'
    },
    sectionHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      marginBottom: '25px'
    },
    sectionIcon: {
      fontSize: '2rem',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      borderRadius: '50%',
      width: '60px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white'
    },
    sectionHeading: {
      color: '#2c3e50',
      margin: 0,
      fontSize: '1.5rem',
      fontWeight: '600'
    },
    formRow: {
      display: 'flex',
      gap: '25px',
      marginBottom: '25px'
    },
    formGroup: {
      marginBottom: '25px',
      flex: 1,
      position: 'relative'
    },
    label: {
      display: 'block',
      marginBottom: '10px',
      fontWeight: '600',
      color: '#2c3e50',
      fontSize: '14px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    input: {
      width: '100%',
      padding: '15px 20px',
      border: '2px solid #e0e0e0',
      borderRadius: '10px',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      boxSizing: 'border-box',
      background: 'white',
      fontFamily: 'inherit'
    },
    inputFocus: {
      borderColor: '#667eea',
      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
      outline: 'none',
      transform: 'translateY(-2px)'
    },
    inputError: {
      borderColor: '#e74c3c',
      boxShadow: '0 0 0 3px rgba(231, 76, 60, 0.1)'
    },
    select: {
      width: '100%',
      padding: '15px 20px',
      border: '2px solid #e0e0e0',
      borderRadius: '10px',
      fontSize: '16px',
      backgroundColor: 'white',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontFamily: 'inherit',
      appearance: 'none',
      backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'><path fill='%23666' d='M2 0L0 2h4zm0 5L0 3h4z'/></svg>")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 15px center',
      backgroundSize: '12px'
    },
    textarea: {
      width: '100%',
      padding: '15px 20px',
      border: '2px solid #e0e0e0',
      borderRadius: '10px',
      fontSize: '16px',
      fontFamily: 'inherit',
      resize: 'vertical',
      minHeight: '120px',
      boxSizing: 'border-box',
      transition: 'all 0.3s ease',
      lineHeight: '1.5'
    },
    checkboxGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '15px',
      marginTop: '15px'
    },
    checkboxCard: {
      display: 'flex',
      alignItems: 'center',
      padding: '15px 20px',
      backgroundColor: 'white',
      borderRadius: '10px',
      border: '2px solid #e0e0e0',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden'
    },
    checkboxCardSelected: {
      borderColor: '#667eea',
      backgroundColor: '#f0f4ff',
      transform: 'translateY(-3px)',
      boxShadow: '0 5px 15px rgba(102, 126, 234, 0.2)'
    },
    checkboxIcon: {
      fontSize: '1.5rem',
      marginRight: '15px'
    },
    checkboxLabel: {
      flex: 1,
      fontWeight: '500',
      color: '#2c3e50',
      margin: 0
    },
    checkbox: {
      width: '20px',
      height: '20px',
      margin: 0,
      cursor: 'pointer',
      opacity: 0,
      position: 'absolute',
      right: '15px'
    },
    errorText: {
      color: '#e74c3c',
      fontSize: '12px',
      marginTop: '5px',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '5px'
    },
    submitBtn: {
      width: '100%',
      padding: '18px',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '18px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      position: 'relative',
      overflow: 'hidden'
    },
    submitBtnHover: {
      transform: 'translateY(-3px)',
      boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)'
    },
    submitBtnDisabled: {
      opacity: 0.7,
      cursor: 'not-allowed',
      transform: 'none'
    },
    loadingSpinner: {
      display: 'inline-block',
      width: '20px',
      height: '20px',
      border: '3px solid rgba(255,255,255,.3)',
      borderRadius: '50%',
      borderTopColor: '#fff',
      animation: 'spin 1s ease-in-out infinite',
      marginRight: '10px'
    },
    required: {
      color: '#e74c3c',
      marginLeft: '4px'
    },
    characterCount: {
      position: 'absolute',
      right: '15px',
      bottom: '10px',
      fontSize: '12px',
      color: '#95a5a6'
    },
    progressBar: {
      height: '4px',
      background: 'linear-gradient(90deg, #667eea, #764ba2)',
      borderRadius: '2px',
      marginBottom: '20px',
      transition: 'width 0.3s ease'
    }
  };

  const [isHovered, setIsHovered] = useState(false);

  // Calculate form completion percentage
  const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'hotelName', 'city', 'state', 'eventType', 'eventDate', 'guestCount'];
  const completedFields = requiredFields.filter(field => formData[field].trim().length > 0).length;
  const completionPercentage = Math.round((completedFields / requiredFields.length) * 100);

  return (
    <div style={styles.outerContainer}>
      <div style={styles.container}>
        <div style={styles.innerContainer}>
          <h2 style={styles.heading}>🏨 EVENT PLANNING</h2>
          <p style={styles.subtitle}>Let's create an unforgettable experience at your venue!</p>
          <p style={styles.mandatoryNote}>* Fields marked with asterisk are mandatory</p>
          
          {/* Progress Bar */}
          <div style={{...styles.progressBar, width: `${completionPercentage}%`}} />
          <div style={{textAlign: 'center', color: '#7f8c8d', marginBottom: '30px', fontSize: '14px'}}>
            Form Completion: {completionPercentage}%
          </div>

          <form onSubmit={handleSubmit}>
            {/* Personal Information Section */}
            <div style={styles.formSection}>
              <div style={styles.sectionHeader}>
                <div style={styles.sectionIcon}>👤</div>
                <h3 style={styles.sectionHeading}>Personal Information</h3>
              </div>
              
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label htmlFor="firstName" style={styles.label}>
                    First Name <span style={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    style={{
                      ...styles.input,
                      ...(touched.firstName && errors.firstName && styles.inputError),
                      ...(formData.firstName && !errors.firstName && { borderColor: '#27ae60' })
                    }}
                    placeholder="Enter your first name"
                  />
                  {touched.firstName && errors.firstName && (
                    <div style={styles.errorText}>❌ {errors.firstName}</div>
                  )}
                </div>
                
                <div style={styles.formGroup}>
                  <label htmlFor="lastName" style={styles.label}>
                    Last Name <span style={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    style={{
                      ...styles.input,
                      ...(touched.lastName && errors.lastName && styles.inputError),
                      ...(formData.lastName && !errors.lastName && { borderColor: '#27ae60' })
                    }}
                    placeholder="Enter your last name"
                  />
                  {touched.lastName && errors.lastName && (
                    <div style={styles.errorText}>❌ {errors.lastName}</div>
                  )}
                </div>
              </div>
              
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label htmlFor="email" style={styles.label}>
                    Email Address <span style={styles.required}>*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    style={{
                      ...styles.input,
                      ...(touched.email && errors.email && styles.inputError),
                      ...(formData.email && !errors.email && { borderColor: '#27ae60' })
                    }}
                    placeholder="your.email@example.com"
                  />
                  {touched.email && errors.email && (
                    <div style={styles.errorText}>❌ {errors.email}</div>
                  )}
                </div>
                
                <div style={styles.formGroup}>
                  <label htmlFor="phone" style={styles.label}>
                    Phone Number <span style={styles.required}>*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    style={{
                      ...styles.input,
                      ...(touched.phone && errors.phone && styles.inputError),
                      ...(formData.phone && !errors.phone && { borderColor: '#27ae60' })
                    }}
                    placeholder="+1 (555) 123-4567"
                  />
                  {touched.phone && errors.phone && (
                    <div style={styles.errorText}>❌ {errors.phone}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Hotel Information Section */}
            <div style={styles.formSection}>
              <div style={styles.sectionHeader}>
                <div style={styles.sectionIcon}>🏨</div>
                <h3 style={styles.sectionHeading}>Hotel Information</h3>
              </div>
              
              <div style={styles.formGroup}>
                <label htmlFor="hotelName" style={styles.label}>
                  Hotel Name <span style={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="hotelName"
                  name="hotelName"
                  value={formData.hotelName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  style={{
                    ...styles.input,
                    ...(touched.hotelName && errors.hotelName && styles.inputError),
                    ...(formData.hotelName && !errors.hotelName && { borderColor: '#27ae60' })
                  }}
                  placeholder="Enter your hotel name"
                />
                {touched.hotelName && errors.hotelName && (
                  <div style={styles.errorText}>❌ {errors.hotelName}</div>
                )}
              </div>
              
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label htmlFor="city" style={styles.label}>
                    City <span style={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    style={{
                      ...styles.input,
                      ...(touched.city && errors.city && styles.inputError),
                      ...(formData.city && !errors.city && { borderColor: '#27ae60' })
                    }}
                    placeholder="Enter city"
                  />
                  {touched.city && errors.city && (
                    <div style={styles.errorText}>❌ {errors.city}</div>
                  )}
                </div>
                
                <div style={styles.formGroup}>
                  <label htmlFor="state" style={styles.label}>
                    State <span style={styles.required}>*</span>
                  </label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    style={{
                      ...styles.select,
                      ...(touched.state && errors.state && styles.inputError),
                      ...(formData.state && !errors.state && { borderColor: '#27ae60' })
                    }}
                  >
                    <option value="">Select State</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  {touched.state && errors.state && (
                    <div style={styles.errorText}>❌ {errors.state}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Event Details Section */}
            <div style={styles.formSection}>
              <div style={styles.sectionHeader}>
                <div style={styles.sectionIcon}>📅</div>
                <h3 style={styles.sectionHeading}>Event Details</h3>
              </div>
              
              <div style={styles.formGroup}>
                <label htmlFor="eventType" style={styles.label}>
                  Event Type <span style={styles.required}>*</span>
                </label>
                <select
                  id="eventType"
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  style={{
                    ...styles.select,
                    ...(touched.eventType && errors.eventType && styles.inputError),
                    ...(formData.eventType && !errors.eventType && { borderColor: '#27ae60' })
                  }}
                >
                  <option value="">Select Event Type</option>
                  {eventTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {touched.eventType && errors.eventType && (
                  <div style={styles.errorText}>❌ {errors.eventType}</div>
                )}
              </div>
              
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label htmlFor="eventDate" style={styles.label}>
                    Event Date <span style={styles.required}>*</span>
                  </label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    style={{
                      ...styles.input,
                      ...(touched.eventDate && errors.eventDate && styles.inputError),
                      ...(formData.eventDate && !errors.eventDate && { borderColor: '#27ae60' })
                    }}
                  />
                  {touched.eventDate && errors.eventDate && (
                    <div style={styles.errorText}>❌ {errors.eventDate}</div>
                  )}
                </div>
                
                <div style={styles.formGroup}>
                  <label htmlFor="guestCount" style={styles.label}>
                    Number of Guests <span style={styles.required}>*</span>
                  </label>
                  <input
                    type="number"
                    id="guestCount"
                    name="guestCount"
                    value={formData.guestCount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    min="1"
                    max="10000"
                    required
                    style={{
                      ...styles.input,
                      ...(touched.guestCount && errors.guestCount && styles.inputError),
                      ...(formData.guestCount && !errors.guestCount && { borderColor: '#27ae60' })
                    }}
                    placeholder="e.g., 150"
                  />
                  {touched.guestCount && errors.guestCount && (
                    <div style={styles.errorText}>❌ {errors.guestCount}</div>
                  )}
                </div>
              </div>
              
              <div style={styles.formGroup}>
                <label htmlFor="budget" style={styles.label}>Estimated Budget (Optional)</label>
                <input
                  type="text"
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="e.g., $5,000 - $10,000"
                />
              </div>
            </div>

            {/* Services Needed Section */}
            <div style={styles.formSection}>
              <div style={styles.sectionHeader}>
                <div style={styles.sectionIcon}>🎯</div>
                <h3 style={styles.sectionHeading}>Services Required</h3>
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Select Services Needed (Optional)</label>
                <div style={styles.checkboxGrid}>
                  {services.map(service => (
                    <label 
                      key={service.id}
                      htmlFor={service.id}
                      style={{
                        ...styles.checkboxCard,
                        ...(formData.servicesNeeded.includes(service.name) && styles.checkboxCardSelected)
                      }}
                    >
                      <span style={styles.checkboxIcon}>{service.icon}</span>
                      <span style={styles.checkboxLabel}>{service.name}</span>
                      <input
                        type="checkbox"
                        id={service.id}
                        value={service.name}
                        checked={formData.servicesNeeded.includes(service.name)}
                        onChange={handleChange}
                        style={styles.checkbox}
                      />
                    </label>
                  ))}
                </div>
              </div>
              
              <div style={styles.formGroup}>
                <label htmlFor="venueType" style={styles.label}>Preferred Venue Type (Optional)</label>
                <input
                  type="text"
                  id="venueType"
                  name="venueType"
                  value={formData.venueType}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="e.g., Ballroom, Conference Room, Outdoor Space, etc."
                />
              </div>
              
              <div style={styles.formGroup}>
                <label htmlFor="specialRequirements" style={styles.label}>
                  Special Requirements (Optional)
                  <span style={styles.characterCount}>
                    {formData.specialRequirements.length}/500
                  </span>
                </label>
                <textarea
                  id="specialRequirements"
                  name="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={handleChange}
                  maxLength="500"
                  rows="4"
                  placeholder="Any specific themes, cultural requirements, dietary restrictions, or special arrangements you'd like us to know about..."
                  style={styles.textarea}
                />
              </div>
            </div>

            {/* Contact Preference Section */}
            <div style={styles.formSection}>
              <div style={styles.sectionHeader}>
                <div style={styles.sectionIcon}>📞</div>
                <h3 style={styles.sectionHeading}>Contact Preference</h3>
              </div>
              
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label htmlFor="contactMethod" style={styles.label}>Preferred Contact Method</label>
                  <select
                    id="contactMethod"
                    name="contactMethod"
                    value={formData.contactMethod}
                    onChange={handleChange}
                    style={styles.select}
                  >
                    <option value="">Select Preferred Method</option>
                    {contactMethods.map(method => (
                      <option key={method.value} value={method.value}>
                        {method.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div style={styles.formGroup}>
                  <label htmlFor="bestTime" style={styles.label}>Best Time to Contact</label>
                  <select
                    id="bestTime"
                    name="bestTime"
                    value={formData.bestTime}
                    onChange={handleChange}
                    style={styles.select}
                  >
                    <option value="">Select Best Time</option>
                    {bestTimes.map(time => (
                      <option key={time.value} value={time.value}>
                        {time.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              style={{
                ...styles.submitBtn,
                ...(isHovered && !isSubmitting && styles.submitBtnHover),
                ...(isSubmitting && styles.submitBtnDisabled)
              }}
              onMouseEnter={() => !isSubmitting && setIsHovered(true)}
              onMouseLeave={() => !isSubmitting && setIsHovered(false)}
            >
              {isSubmitting ? (
                <>
                  <span style={styles.loadingSpinner}></span>
                  Processing Your Inquiry...
                </>
              ) : (
                '🏨 Submit Hotel Event Inquiry'
              )}
            </button>
          </form>
        </div>

        {/* Add CSS animation for spinner */}
        <style>
          {`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default ContactForm;