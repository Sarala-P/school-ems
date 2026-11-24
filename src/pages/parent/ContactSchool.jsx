import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, School, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import FormInput from '../../components/common/FormInput';
import { useAuth } from '../../context/AuthContext';

export default function ContactSchool() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    subject: '',
    department: 'Principal Office',
    message: '',
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.subject || !formData.message) {
      toast.error('Please enter subject and message');
      return;
    }
    setIsSent(true);
    toast.success('Your message has been delivered to school administration.');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Contact School Administration</h1>
        <p className="text-sm text-gray-500">Submit queries, appointment requests, or feedback to the principal or administrative desk</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contact Info Sidebar */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div className="p-2.5 bg-orange-100 text-orange-700 rounded-xl">
              <School className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base">Delhi Public School</h3>
              <p className="text-xs text-gray-400">Main Campus</p>
            </div>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-800">Campus Address</p>
                <p className="text-xs text-gray-500 mt-0.5">45, MG Road, Institutional Area, New Delhi - 110001</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-800">Helpline / Reception</p>
                <p className="text-xs text-gray-500 mt-0.5">+91 11 2345 6789</p>
                <p className="text-xs text-gray-500">+91 98765 43210</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-800">Email Desks</p>
                <p className="text-xs text-gray-500 mt-0.5">principal@schoolems.com</p>
                <p className="text-xs text-gray-500">parents@schoolems.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-800">Parent Visiting Hours</p>
                <p className="text-xs text-gray-500 mt-0.5">Mon - Fri: 10:00 AM - 01:00 PM</p>
                <p className="text-xs text-gray-500">Saturday: 09:30 AM - 12:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          {isSent ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Message Delivered Successfully</h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                Your communication has been dispatched to {formData.department}. The school administration will respond via registered phone or email within 24-48 business hours.
              </p>
              <button
                onClick={() => {
                  setIsSent(false);
                  setFormData({ subject: '', department: 'Principal Office', message: '' });
                }}
                className="px-5 py-2 bg-orange-600 text-white rounded-lg text-sm font-semibold hover:bg-orange-700 transition"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-bold text-gray-800 text-base mb-1">Send an Inquiry or Request</h3>
              <p className="text-xs text-gray-400 mb-4">Direct message to department coordinators</p>

              <FormInput
                label="Department / Recipient"
                type="select"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                options={[
                  { value: 'Principal Office', label: 'Principal Office' },
                  { value: 'Class Teacher', label: 'Class Teacher' },
                  { value: 'Accounts & Fees', label: 'Accounts & Fee Desk' },
                  { value: 'Transport Incharge', label: 'Transportation Department' },
                ]}
              />

              <FormInput
                label="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
                placeholder="e.g. Leave application or appointment request"
              />

              <FormInput
                label="Message / Query Details"
                type="textarea"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                placeholder="Describe your query in detail..."
              />

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold text-sm transition shadow-sm"
                >
                  <Send className="w-4 h-4" /> Send Communication
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
