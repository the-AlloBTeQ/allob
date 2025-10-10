interface ServicesBannerProps {
  className?: string
  speed?: 'slow' | 'normal' | 'fast'
  backgroundColor?: string
  textColor?: string
}

const ServicesBanner = ({ 
  className = '',
  speed = 'normal',
  backgroundColor = 'bg-blue-950',
  textColor = 'text-white'
}: ServicesBannerProps) => {
  const services = [
    'Professional Accounting',
    'Tax Planning & Compliance', 
    'Business Advisory',
    'Financial Reporting',
    'VAT Services',
    'PAYE Administration',
    'Company Secretarial',
    'Management Accounts',
    'Strategic Planning',
    'Risk Management',
    'Bookkeeping Services',
    'Annual Financial Statements',
    'Payroll Processing',
    'CIPC Compliance',
    'SARS Submissions'
  ]

  const speedClasses = {
    slow: 'animate-[scroll_45s_linear_infinite]',
    normal: 'animate-[scroll_30s_linear_infinite]',
    fast: 'animate-[scroll_20s_linear_infinite]'
  }

  return (
    <div className={`${backgroundColor} ${textColor} py-2 overflow-hidden ${className}`}>
      <div className={`whitespace-nowrap ${speedClasses[speed]}`}>
        {Array(3).fill(services).flat().map((service, index) => (
          <span key={index} className="inline-block mx-8 text-sm font-medium">
            {service} 
            <span className="mx-4 text-blue-300 opacity-60">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default ServicesBanner