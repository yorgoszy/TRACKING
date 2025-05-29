import Image from "next/image"

export default function ServicesSection() {
  const services = [
    {
      title: "Performance Training",
      description: "Customized training programs designed to enhance athletic performance and prevent injuries.",
      image: "/performance-training.png",
    },
    {
      title: "Strength & Conditioning",
      description: "Build strength, power, and endurance with our specialized strength and conditioning programs.",
      image: "/strength-conditioning.png",
    },
    {
      title: "Recovery & Rehabilitation",
      description:
        "Comprehensive recovery protocols and rehabilitation services to help you return to peak performance.",
      image: "/recovery-rehab.png",
    },
  ]

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Services</h2>
          <div className="w-24 h-1 bg-brand mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We offer comprehensive training solutions designed to help athletes reach their full potential and achieve
            their performance goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white shadow-lg group overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <button className="text-brand font-semibold flex items-center group-hover:text-brand-dark transition-colors">
                  Learn More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
