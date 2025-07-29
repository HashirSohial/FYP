import { Shield, Zap, Eye, BarChart3, CheckCircle, AlertTriangle, Cpu } from 'lucide-react';

export const Homepage: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Blockchain Security',
      description: 'Immutable product registration on Ethereum blockchain ensures data integrity and prevents tampering.'
    },
    {
      icon: Zap,
      title: 'Instant Verification',
      description: 'Real-time product authentication using barcode/QR scanning with instant blockchain verification.'
    },
    {
      icon: Eye,
      title: 'Visibility and Confirmation',
      description: 'Blockchain offers transparent and immutable records, ensuring full traceability .'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Comprehensive insights into product flows, verification trends, and fraud detection metrics.'
    }
  ];

  const benefits = [
    'Reduce counterfeit goods by up to 95%',
    'Instant product verification for consumers',
    'Protect brand reputation and consumer trust',
    'Real-time fraud alerts and notifications',
    'Complete product history tracking',
    'Regulatory compliance support'
  ];

  const stats = [
    { value: '2.5M+', label: 'Products Verified' },
    { value: '10K+', label: 'Fraud Cases Detected' },
    { value: '500+', label: 'Partner Manufacturers' },
    { value: '99.9%', label: 'System Uptime' }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-600 via-emerald-600 to-cyan-600 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Eliminate Counterfeit Products with{' '}
                <span className="text-yellow-300 bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent">
                  Blockchain Technology
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-teal-100">
                Secure product authentication using immutable blockchain records and AI-powered fraud detection
              </p>
          
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-gradient-to-b from-red-900/20 to-black border-y border-red-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <AlertTriangle className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              The Counterfeit Crisis
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Counterfeit goods cost the global economy over $500 billion annually, 
              threatening consumer safety and brand integrity across all industries.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg shadow-xl border border-gray-700 transform hover:scale-105 transition-transform duration-200">
              <div className="text-red-400 text-3xl font-bold mb-2">$500B+</div>
              <div className="text-white font-semibold mb-2">Annual Global Loss</div>
              <div className="text-gray-400">Economic impact of counterfeit goods worldwide</div>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg shadow-xl border border-gray-700 transform hover:scale-105 transition-transform duration-200">
              <div className="text-red-400 text-3xl font-bold mb-2">2.5%</div>
              <div className="text-white font-semibold mb-2">Of Global Trade</div>
              <div className="text-gray-400">Percentage of international trade that is counterfeit</div>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg shadow-xl border border-gray-700 transform hover:scale-105 transition-transform duration-200">
              <div className="text-red-400 text-3xl font-bold mb-2">1M+</div>
              <div className="text-white font-semibold mb-2">Deaths Annually</div>
              <div className="text-gray-400">From counterfeit medicines and products</div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Cpu className="h-16 w-16 text-teal-400 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Blockchain Solution
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Combining blockchain immutability with AI-powered detection to create 
              an unbreakable chain of product authenticity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group text-center p-6 rounded-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-gray-900 to-black border border-gray-700"
              >
                <div className="bg-gradient-to-br from-teal-600/20 to-emerald-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-teal-600/30 group-hover:to-emerald-600/30 transition-colors duration-200">
                  <feature.icon className="h-8 w-8 text-teal-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Protect Your Brand & Customers
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Our comprehensive anti-counterfeiting solution provides multiple layers 
                of protection for manufacturers, retailers, and consumers.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-teal-400 flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg shadow-xl border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Platform Statistics</h3>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-teal-400 mb-2">{stat.value}</div>
                    <div className="text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Secure Your Products?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of manufacturers already protecting their brands with blockchain technology.
          </p>
          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-teal-50 transition-all duration-200 transform hover:scale-105 shadow-lg">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-all duration-200 shadow-lg">
              Schedule Demo
            </button>
          </div> */}
        </div>
      </section>
    </div>
  );
};