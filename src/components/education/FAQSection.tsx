
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const FAQSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqs = [
    {
      category: "Reporting Process",
      question: "How do I report a fraud incident?",
      answer: "You can report fraud through our online portal by clicking 'Report Fraud' on the homepage. Fill in the required details, upload evidence if available, and submit. You'll receive a reference number to track your complaint."
    },
    {
      category: "Reporting Process",
      question: "What information do I need to report fraud?",
      answer: "Basic details include: type of fraud, date and time of incident, financial loss (if any), communication details (phone numbers, emails, websites), and any evidence like screenshots, recordings, or documents."
    },
    {
      category: "Account Security",
      question: "How can I secure my bank account after fraud?",
      answer: "Immediately contact your bank to freeze the account, change all passwords and PINs, monitor account statements regularly, set up transaction alerts, and file a complaint with both your bank and our portal."
    },
    {
      category: "Digital Payments",
      question: "What should I do if I've made a fraudulent UPI transaction?",
      answer: "Contact your bank immediately, report to the UPI app customer service, file a complaint on our portal, keep all transaction details and screenshots, and report to the National Cyber Crime Reporting Portal (cybercrime.gov.in)."
    },
    {
      category: "Prevention",
      question: "How can I verify if a website is legitimate?",
      answer: "Check for HTTPS in the URL, look for contact information and physical address, verify SSL certificates, read reviews and ratings, check domain registration details, and be wary of poor grammar or spelling."
    },
    {
      category: "Recovery",
      question: "Can I recover money lost to fraud?",
      answer: "Recovery depends on various factors including how quickly you report, the fraud type, and cooperation from financial institutions. Report immediately to increase chances of recovery through our portal and your bank."
    },
    {
      category: "Legal Process",
      question: "What legal action can be taken against fraudsters?",
      answer: "Fraud cases can be filed under IT Act 2000, IPC sections for cheating and forgery, and specific banking laws. Our portal helps connect you with law enforcement for proper legal proceedings."
    },
    {
      category: "Support",
      question: "Is there 24/7 support available?",
      answer: "Yes, our helpline 1930 operates 24/7 for cybercrime reporting. For other support, use our online chat or email support with response times of 2-4 hours during business days."
    }
  ];

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [...new Set(faqs.map(faq => faq.category))];

  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions about fraud reporting, prevention, and recovery processes.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Search FAQs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Input
              placeholder="Search questions, answers, or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button>Search</Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <Button 
              variant={searchTerm === '' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSearchTerm('')}
            >
              All
            </Button>
            {categories.map((category) => (
              <Button 
                key={category} 
                variant="outline" 
                size="sm"
                onClick={() => setSearchTerm(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredFAQs.map((faq, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <button
                className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
                onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-india-saffron font-medium mb-1">{faq.category}</div>
                    <h3 className="font-semibold text-lg">{faq.question}</h3>
                  </div>
                  <div className="text-2xl text-gray-400">
                    {expandedFAQ === index ? '−' : '+'}
                  </div>
                </div>
              </button>
              {expandedFAQ === index && (
                <div className="px-6 pb-6">
                  <div className="border-t pt-4">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFAQs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No FAQs found matching your search.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => setSearchTerm('')}
          >
            Clear Search
          </Button>
        </div>
      )}

      <Card className="mt-12">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-semibold mb-4">Still have questions?</h3>
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? Our support team is here to help you 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button>Contact Support</Button>
            <Button variant="outline">Live Chat</Button>
            <Button variant="outline">Call 1930</Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default FAQSection;
