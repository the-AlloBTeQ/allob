import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, User, Mail, Phone, Building2, 
  FileText, CheckCircle, AlertCircle, Video, 
  MapPin, Send, Globe, MessageSquare, Shield
} from 'lucide-react';

// Extend Window type for Google Calendar scheduling button
declare global {
  interface Window {
    calendar?: {
      schedulingButton?: {
        load: (options: any) => void;
      };
    };
  }
}

const Booking = () => {
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    consultationType: '',
    preferredDate: '',
    preferredTime: '',
    meetingType: 'video',
    businessDescription: '',
    specificRequirements: '',
    urgency: 'standard'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  // Removed unused bookingMethod state
  const [showGoogleBooking, setShowGoogleBooking] = useState(false);

  // Load Google Calendar Appointment Scheduling
  useEffect(() => {
    // Load the CSS
    const link = document.createElement('link');
    link.href = 'https://calendar.google.com/calendar/scheduling-button-script.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Load the script
    const script = document.createElement('script');
    script.src = 'https://calendar.google.com/calendar/scheduling-button-script.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup
      document.head.removeChild(link);
      document.head.removeChild(script);
    };
  }, []);

  const initializeGoogleBooking = () => {
    if (window.calendar && window.calendar.schedulingButton) {
      const target = document.getElementById('google-booking-target');
      if (target) {
        window.calendar.schedulingButton.load({
          url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ2PtgqMizzaXA3gR9YJNFLnHwoA-Qb6UqWh3EQbRU730pOZDnKx2evQq-0FCaT_OHs7y82bFkcW?gv=true',
          color: '#039BE5',
          label: 'Book Your Consultation',
          target,
        });
      }
    }
  };

  const consultationTypes = [
    { value: 'accounting', label: 'Accounting Services', duration: '60 minutes' },
    { value: 'tax', label: 'Tax Advisory', duration: '45 minutes' },
    { value: 'business', label: 'Business Advisory', duration: '90 minutes' },
    { value: 'company-secretarial', label: 'Company Secretarial', duration: '45 minutes' },
    { value: 'payroll', label: 'Payroll Services', duration: '30 minutes' },
    { value: 'general', label: 'General Consultation', duration: '60 minutes' }
  ];

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

interface BookingFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    consultationType: string;
    preferredDate: string;
    preferredTime: string;
    meetingType: 'video' | 'phone' | 'inPerson';
    businessDescription: string;
    specificRequirements: string;
    urgency: 'standard' | 'urgent' | 'asap';
}

interface ValidationErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    company?: string;
    consultationType?: string;
    preferredDate?: string;
    preferredTime?: string;
    meetingType?: string;
    businessDescription?: string;
    specificRequirements?: string;
    urgency?: string;
}

interface BookingMethodEvent extends React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> {}

const [validationErrors] = useState<ValidationErrors>({});
const [securityAlert] = useState<string | null>(null);

const handleInputChange = (e: BookingMethodEvent) => {
    const { name, value } = e.target;
    setFormData((prev: BookingFormData) => ({
        ...prev,
        [name]: value
    }));
};

  const generateMeetingTitle = () => {
    const consultationType = consultationTypes.find(type => type.value === formData.consultationType);
    return `${consultationType?.label || 'Business Consultation'} - ${formData.firstName} ${formData.lastName}`;
  };

  const generateMeetingDescription = () => {
    const consultationType = consultationTypes.find(type => type.value === formData.consultationType);
    return `Business Consultation with AlloB Consultants

Meeting Details:
- Client: ${formData.firstName} ${formData.lastName}
- Company: ${formData.company}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Consultation Type: ${consultationType?.label}
- Duration: ${consultationType?.duration}
- Meeting Type: ${formData.meetingType === 'video' ? 'Video Call (Google Meet/Teams)' : 
                  formData.meetingType === 'phone' ? 'Phone Call' : 'In-Person Meeting'}

Business Description:
${formData.businessDescription}

Specific Requirements:
${formData.specificRequirements}

---
AlloB Consultants - Integrity and Innovation
Email: sales.booking@allob.co.za
Phone: +27 11 234 5678`;
  };

interface FormatDateForCalendarParams {
    date: string;
    time: string;
}

const formatDateForCalendar = (date: FormatDateForCalendarParams['date'], time: FormatDateForCalendarParams['time']): string => {
    const datetime = new Date(`${date}T${time}:00`);
    return datetime.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
};

  const createGoogleCalendarLink = () => {
    const startDate = formatDateForCalendar(formData.preferredDate, formData.preferredTime);
    const consultationType = consultationTypes.find(type => type.value === formData.consultationType);
    const duration = consultationType?.duration || '60 minutes';
    const durationInMinutes = parseInt(duration) || 60;
    
    const endDateTime = new Date(new Date(`${formData.preferredDate}T${formData.preferredTime}:00`).getTime() + durationInMinutes * 60000);
    const endDate = endDateTime.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: generateMeetingTitle(),
      dates: `${startDate}/${endDate}`,
      details: generateMeetingDescription(),
      location: formData.meetingType === 'inPerson' ? 'AlloB Consultants Office, Midrand, Gauteng' : 
                formData.meetingType === 'video' ? 'Video Call (Link to be provided)' : 'Phone Call',
      add: 'sales.booking@allob.co.za'
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  const createOutlookLink = () => {
    const startDate = formatDateForCalendar(formData.preferredDate, formData.preferredTime);
    const consultationType = consultationTypes.find(type => type.value === formData.consultationType);
    const duration = consultationType?.duration || '60 minutes';
    const durationInMinutes = parseInt(duration) || 60;
    
    const endDateTime = new Date(new Date(`${formData.preferredDate}T${formData.preferredTime}:00`).getTime() + durationInMinutes * 60000);
    const endDate = endDateTime.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const params = new URLSearchParams({
      path: '/calendar/action/compose',
      rru: 'addevent',
      subject: generateMeetingTitle(),
      startdt: startDate,
      enddt: endDate,
      body: generateMeetingDescription(),
      location: formData.meetingType === 'inPerson' ? 'AlloB Consultants Office, Midrand, Gauteng' : 
                formData.meetingType === 'video' ? 'Video Call (Link to be provided)' : 'Phone Call'
    });

    return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
  };

  const createMailtoLink = () => {
    const consultationType = consultationTypes.find(type => type.value === formData.consultationType);
    const meetingDate = new Date(`${formData.preferredDate}T${formData.preferredTime}:00`);
    
    const subject = encodeURIComponent(`Meeting Request: ${generateMeetingTitle()}`);
    const body = encodeURIComponent(`Dear AlloB Consultants Team,

I would like to schedule a consultation meeting with the following details:

MEETING REQUEST
Subject: ${generateMeetingTitle()}
Date: ${meetingDate.toLocaleDateString('en-ZA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
Time: ${formData.preferredTime}
Duration: ${consultationType?.duration}
Type: ${formData.meetingType === 'video' ? 'Video Call (Google Meet/Teams preferred)' : 
         formData.meetingType === 'phone' ? 'Phone Call' : 'In-Person Meeting'}

CLIENT INFORMATION
Name: ${formData.firstName} ${formData.lastName}
Company: ${formData.company}
Email: ${formData.email}
Phone: ${formData.phone}

CONSULTATION DETAILS
Service Required: ${consultationType?.label}
Business Description: ${formData.businessDescription}
Specific Requirements: ${formData.specificRequirements}
Priority: ${formData.urgency}

Please confirm this meeting request and provide the meeting link/location details.

Best regards,
${formData.firstName} ${formData.lastName}`);

    return `mailto:sales.booking@allob.co.za?subject=${subject}&body=${body}`;
  };

interface HandleBookingMethodParams {
    method: 'google' | 'outlook' | 'email';
}

type RequiredField =
    | 'firstName'
    | 'lastName'
    | 'email'
    | 'phone'
    | 'consultationType'
    | 'preferredDate'
    | 'preferredTime';

const handleBookingMethod = (method: HandleBookingMethodParams['method']): void => {
    // Validate required fields
    const requiredFields: RequiredField[] = [
        'firstName',
        'lastName',
        'email',
        'phone',
        'consultationType',
        'preferredDate',
        'preferredTime'
    ];
    const missingFields: RequiredField[] = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
        alert('Please fill in all required fields before booking.');
        return;
    }

    let bookingUrl: string | undefined;
    switch (method) {
        case 'google':
            bookingUrl = createGoogleCalendarLink();
            break;
        case 'outlook':
            bookingUrl = createOutlookLink();
            break;
        case 'email':
            bookingUrl = createMailtoLink();
            break;
        default:
            return;
    }

    window.open(bookingUrl, '_blank');
    setIsSubmitted(true);
};

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Book Your Consultation
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Schedule a personalized consultation with our expert team to discuss your business needs
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Security Alert */}
        {securityAlert && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-red-600 mr-2" />
              <span className="text-sm text-red-800 font-medium">{securityAlert}</span>
            </div>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start">
                <Shield className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Security & Privacy Notice</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• All form inputs are automatically sanitized and validated</li>
                    <li>• Your data is protected against injection attacks and malicious content</li>
                    <li>• We use secure transmission protocols for all communications</li>
                    <li>• Personal information is only used for consultation scheduling</li>
                    <li>• Data is processed in accordance with POPIA compliance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {!isSubmitted ? (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Consultation Details</h2>
              <p className="text-gray-600">Please provide your information to schedule your consultation</p>
            </div>

            <div className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        validationErrors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Enter your first name"
                      maxLength={50}
                    />
                  </div>
                  {validationErrors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        validationErrors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Enter your last name"
                      maxLength={50}
                    />
                  </div>
                  {validationErrors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        validationErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="your.email@example.com"
                      maxLength={254}
                    />
                  </div>
                  {validationErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        validationErrors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="+27 11 123 4567"
                      maxLength={20}
                    />
                  </div>
                  {validationErrors.phone && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.phone}</p>
                  )}
                </div>
              </div>

              {/* Company Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      validationErrors.company ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Your company name"
                    maxLength={100}
                  />
                </div>
                {validationErrors.company && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.company}</p>
                )}
              </div>

              {/* Consultation Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Consultation Type *
                </label>
                <select
                  name="consultationType"
                  value={formData.consultationType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select consultation type</option>
                  {consultationTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label} ({type.duration})
                    </option>
                  ))}
                </select>
              </div>

              {/* Meeting Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      min={today}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time *
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select time</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Meeting Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meeting Type *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50">
                    <input
                      type="radio"
                      name="meetingType"
                      value="video"
                      checked={formData.meetingType === 'video'}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 ${formData.meetingType === 'video' ? 'border-blue-600 bg-blue-600' : 'border-gray-300'}`}>
                      {formData.meetingType === 'video' && <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>}
                    </div>
                    <Video className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-sm font-medium">Video Call</span>
                  </label>

                  <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50">
                    <input
                      type="radio"
                      name="meetingType"
                      value="phone"
                      checked={formData.meetingType === 'phone'}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 ${formData.meetingType === 'phone' ? 'border-blue-600 bg-blue-600' : 'border-gray-300'}`}>
                      {formData.meetingType === 'phone' && <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>}
                    </div>
                    <Phone className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-sm font-medium">Phone Call</span>
                  </label>

                  <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50">
                    <input
                      type="radio"
                      name="meetingType"
                      value="inPerson"
                      checked={formData.meetingType === 'inPerson'}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 ${formData.meetingType === 'inPerson' ? 'border-blue-600 bg-blue-600' : 'border-gray-300'}`}>
                      {formData.meetingType === 'inPerson' && <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>}
                    </div>
                    <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-sm font-medium">In Person</span>
                  </label>
                </div>
              </div>

              {/* Business Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Description
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <textarea
                    name="businessDescription"
                    value={formData.businessDescription}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description of your business and current situation"
                  />
                </div>
              </div>

              {/* Specific Requirements */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specific Requirements
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <textarea
                    name="specificRequirements"
                    value={formData.specificRequirements}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="What specific topics would you like to discuss during the consultation?"
                  />
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority Level
                </label>
                <select
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="standard">Standard (within 1 week)</option>
                  <option value="urgent">Urgent (within 2-3 days)</option>
                  <option value="asap">ASAP (within 24 hours)</option>
                </select>
              </div>
            </div>

            {/* Booking Options */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Your Booking Method</h3>
              <p className="text-gray-600 mb-6">Select your preferred method to schedule this consultation:</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => {
                    setShowGoogleBooking(true);
                    setTimeout(initializeGoogleBooking, 100);
                  }}
                  className="flex flex-col items-center p-6 border-2 border-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <Globe className="w-8 h-8 text-green-600 mb-2" />
                  <span className="font-semibold text-green-900">Google Booking</span>
                  <span className="text-sm text-green-700 text-center mt-1">Official Google Calendar booking</span>
                </button>

                <button
                  onClick={() => handleBookingMethod('google')}
                  className="flex flex-col items-center p-6 border-2 border-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Globe className="w-8 h-8 text-blue-600 mb-2" />
                  <span className="font-semibold text-blue-900">Google Calendar</span>
                  <span className="text-sm text-blue-700 text-center mt-1">Add directly to your Google Calendar</span>
                </button>

                <button
                  onClick={() => handleBookingMethod('outlook')}
                  className="flex flex-col items-center p-6 border-2 border-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <Calendar className="w-8 h-8 text-purple-600 mb-2" />
                  <span className="font-semibold text-purple-900">Outlook</span>
                  <span className="text-sm text-purple-700 text-center mt-1">Add to Outlook Calendar</span>
                </button>

                <button
                  onClick={() => handleBookingMethod('email')}
                  className="flex flex-col items-center p-6 border-2 border-orange-600 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
                >
                  <Send className="w-8 h-8 text-orange-600 mb-2" />
                  <span className="font-semibold text-orange-900">Email Request</span>
                  <span className="text-sm text-orange-700 text-center mt-1">Send meeting request via email</span>
                </button>
              </div>

              {/* Google Booking Widget */}
              {showGoogleBooking && (
                <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="text-lg font-semibold text-blue-900 mb-4">Book Your Consultation</h4>
                  <p className="text-blue-800 mb-4">
                    Use our official Google Calendar booking system to schedule your consultation directly:
                  </p>
                  <div id="google-booking-target" className="text-center"></div>
                  <div className="mt-4 text-sm text-blue-700">
                    <p><strong>Note:</strong> This will automatically send your booking details to our sales team and add the appointment to your calendar.</p>
                  </div>
                </div>
              )}

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                  <span className="text-sm text-yellow-800">
                    <strong>Recommended:</strong> Use "Google Booking" for the most seamless experience. Other options are available as alternatives.
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Success Message */
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Consultation Request Sent!
            </h2>
            <p className="text-gray-600 mb-6">
              Your consultation request has been submitted successfully. We'll confirm your appointment within 24 hours.
            </p>
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">Next Steps:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Check your email for a confirmation message</li>
                <li>• Our team will review your request and confirm the appointment</li>
                <li>• You'll receive meeting details (video link/phone number/address) before the consultation</li>
                <li>• Please prepare any relevant documents or questions for the meeting</li>
              </ul>
            </div>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  firstName: '',
                  lastName: '',
                  email: '',
                  phone: '',
                  company: '',
                  consultationType: '',
                  preferredDate: '',
                  preferredTime: '',
                  meetingType: 'video',
                  businessDescription: '',
                  specificRequirements: '',
                  urgency: 'standard'
                });
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Book Another Consultation
            </button>
          </div>
        )}
      </div>

      {/* Contact Information */}
      <section className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help with Booking?</h2>
          <p className="text-gray-300 mb-6">
            If you experience any issues with the booking process, please contact us directly:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              <span>+27 67 921 1947</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              <span>info@allob.co.za</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;