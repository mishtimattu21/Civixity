import React from 'react';
import { Phone, AlertTriangle, Siren,Ambulance, Building } from 'lucide-react';

const sampleContacts = [
    { title: "Emergency (India)", number: "112", description: "All-in-one emergency helpline", icon: <AlertTriangle className="h-6 w-6 text-red-600 mr-2" /> },
    { title: "Police", number: "100", description: "Call for police assistance", icon: <Siren className="h-6 w-6 text-blue-600 mr-2" /> },
    { title: "Ambulance", number: "108", description: "Emergency ambulance service", icon: <Ambulance className="h-6 w-6 text-green-600 mr-2" /> },
    { title: "Fire Brigade", number: "101", description: "Fire emergency helpline", icon: <Building className="h-6 w-6 text-orange-600 mr-2" /> },
    { title: "Women’s Helpline", number: "1091", description: "For women's safety and assistance", icon: <Phone className="h-6 w-6 text-pink-600 mr-2" /> },
    { title: "Child Helpline", number: "1098", description: "Emergency assistance for children", icon: <Phone className="h-6 w-6 text-purple-600 mr-2" /> },
    { title: "Disaster Management", number: "108", description: "Helpline for disaster relief and management", icon: <Phone className="h-6 w-6 text-yellow-600 mr-2" /> },
    { title: "Blood Bank", number: "104", description: "Helpline for locating blood banks", icon: <Ambulance className="h-6 w-6 text-teal-600 mr-2" /> },
    { title: "Senior Citizen Helpline", number: "14567", description: "Support for senior citizens", icon: <Phone className="h-6 w-6 text-gray-600 mr-2" /> },
    { title: "Cyber Crime Helpline", number: "1930", description: "Report cybercrimes and online fraud", icon: <Phone className="h-6 w-6 text-blue-600 mr-2" /> },
    { title: "Railway Enquiry", number: "139", description: "For train-related information and assistance", icon: <Phone className="h-6 w-6 text-green-600 mr-2" /> },
    { title: "Tourist Helpline", number: "1363", description: "Assistance for tourists in India", icon: <Phone className="h-6 w-6 text-indigo-600 mr-2" /> },
  ];

export default function Contacts() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 flex items-center">
        <Phone className="h-8 w-8 mr-2" />
        Important Contacts
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        {sampleContacts.map((contact, index) => (
          <div key={index} className="bg-red-50 p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              {contact.icon}
              <h2 className="text-xl font-semibold text-red-600">{contact.title}</h2>
            </div>
            <div className="space-y-3">
              <p className="font-bold text-2xl text-red-600">{contact.number}</p>
              <p className="text-gray-600">{contact.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}