import React from 'react';


interface PageHeroProps {
  title: string;
  description: string;
  stats?: Array<{ label: string; value: string }>;
  gradient?: string;
}

export const PageHero = ({ 
  title, 
  description, 
  stats,
  gradient = "from-gray-900 via-blue-900 to-gray-900"
}: PageHeroProps) => {
  return (
    <div className={`bg-gradient-to-r ${gradient} text-white py-16`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {description}
          </p>
        </div>
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/10 p-4 rounded-lg">
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p className="text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface PageContainerProps {
  children: React.ReactNode;
}

export const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {children}
    </div>
  );
};