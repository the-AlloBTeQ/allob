import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/layout'
import { HelmetProvider } from 'react-helmet-async'
import Home from './pages/Home'
import Booking from './pages/booking'

// Lazy load all other components
const Services = lazy(() => import('./pages/Services'))
const Deals = lazy(() => import('./pages/deals'))
const About = lazy(() => import('./pages/About'))
const Industries = lazy(() => import('./pages/Industries'))
const Contact = lazy(() => import('./pages/Contact'))
const Articles = lazy(() => import('./pages/Articles'))
const ArticleDetail = lazy(() => import('./articles/ArticleDetail'))
const Careers = lazy(() => import('./pages/Careers'))
const TaxCalculator = lazy(() => import('./pages/TaxCalculator'))
const Tools = lazy(() => import('./pages/tools'))
const CheckoutPage = lazy(() => import('./pages/checkout'))
const TaxConsultation = lazy(() => import('./pages/tax-consultation'))
const BusinessAdvisoryServices = lazy(() => import('./services/business-advisory'))
const PayrollManagementServices = lazy(() => import('./services/payroll'))
const DigitalTransformationServices = lazy(() => import('./services/digital-transformation'))
const AccountingServices = lazy(() => import('./services/accounting'))  


// Lazy load industry pages
const TechServices = lazy(() => import('./industry/tech'))
const ManufacturingServices = lazy(() => import('./industry/man'))
const RetailServices = lazy(() => import('./industry/Retail'))
const ProfessionalServices = lazy(() => import('./industry/professional'))
const HealthcareServices = lazy(() => import('./industry/healthcare'))
const ConstructionServices = lazy(() => import('./industry/construction'))
const NPOServices = lazy(() => import('./industry/npo'))

// Lazy load utility pages
const TermsOfService = lazy(() => import('./pages/terms'))
const PrivacyPolicy = lazy(() => import('./pages/privacy'))
const SiteMap = lazy(() => import('./pages/sitemap'))

// Loading component for better UX
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600 mx-auto mb-4"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping border-t-blue-600 mx-auto"></div>
      </div>
      <p className="text-gray-600 font-medium">Loading...</p>
      <p className="text-gray-400 text-sm mt-1">Please wait while we prepare your content</p>
    </div>
  </div>
)

// Error boundary component for lazy loading failures
const LazyLoadErrorFallback = ({ retry }: { retry: () => void }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center max-w-md mx-auto p-6">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load Page</h2>
      <p className="text-gray-600 mb-4">There was an error loading this page. Please try again.</p>
      <div className="space-y-2">
        <button
          onClick={retry}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
        <button
          onClick={() => window.location.href = '/'}
          className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Go to Home
        </button>
      </div>
    </div>
  </div>
)

// Enhanced Suspense wrapper with error handling
const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<PageLoader />}>
    {children}
  </Suspense>
)

function App() {
  return (
    <HelmetProvider>
    <Router>
      <Layout>
        <Routes>
          {/* Home page loads immediately - no lazy loading for better first paint */}
          <Route path="/" element={<Home />} />
          
          {/* Main pages with lazy loading */}
          <Route path="/services" element={
            <SuspenseWrapper>
              <Services />
            </SuspenseWrapper>
          } />
          
          <Route path="/about" element={
            <SuspenseWrapper>
              <About />
            </SuspenseWrapper>
          } />
          
          <Route path="/industries" element={
            <SuspenseWrapper>
              <Industries />
            </SuspenseWrapper>
          } />
          
          <Route path="/contact" element={
            <SuspenseWrapper>
              <Contact />
            </SuspenseWrapper>
          } />
          
          <Route path="/careers" element={
            <SuspenseWrapper>
              <Careers />
            </SuspenseWrapper>
          } />
          
          <Route path="/articles" element={
            <SuspenseWrapper>
              <Articles />
            </SuspenseWrapper>
          } />
          
          {/* Article detail - this is likely your heaviest component */}
          <Route path="/articles/:id" element={
            <SuspenseWrapper>
              <ArticleDetail />
            </SuspenseWrapper>
          } />
          
          {/* Tools and calculators */}
          <Route path="/TaxCalculator" element={
            <SuspenseWrapper>
              <TaxCalculator />
            </SuspenseWrapper>
          } />
          
          <Route path="/tools" element={
            <SuspenseWrapper>
              <Tools />
            </SuspenseWrapper>
          } />
          
          <Route path="/checkout" element={
            <SuspenseWrapper>
              <CheckoutPage />
            </SuspenseWrapper>
          } />
          
          <Route path="/tax-consultation" element={
            <SuspenseWrapper>
              <TaxConsultation />
            </SuspenseWrapper>
          } />
          
          {/* Industry-specific pages */}
          <Route path="/industries/tech" element={
            <SuspenseWrapper>
              <TechServices />
            </SuspenseWrapper>
          } />
          
          <Route path="/industries/manufacturing" element={
            <SuspenseWrapper>
              <ManufacturingServices />
            </SuspenseWrapper>
          } />
          
          <Route path="/industries/retail" element={
            <SuspenseWrapper>
              <RetailServices />
            </SuspenseWrapper>
          } />
          
          <Route path="/industries/professional" element={
            <SuspenseWrapper>
              <ProfessionalServices />
            </SuspenseWrapper>
          } />
          
          
          <Route path="/industries/healthcare" element={
            <SuspenseWrapper>
              <HealthcareServices />
            </SuspenseWrapper>
          } />
          
          <Route path="/industries/construction" element={
            <SuspenseWrapper>
              <ConstructionServices />
            </SuspenseWrapper>
          } />
          
          <Route path="/industries/npo" element={
            <SuspenseWrapper>
              <NPOServices />
            </SuspenseWrapper>
          } />

          <Route path="/services/accounting" element={
            <SuspenseWrapper>
              <AccountingServices />
            </SuspenseWrapper>
          } />

          <Route path="/services/business-advisory" element={
            <SuspenseWrapper>
              <BusinessAdvisoryServices />
            </SuspenseWrapper>
          } />
          
          <Route path="/services/payroll" element={
            <SuspenseWrapper>
              <PayrollManagementServices />
            </SuspenseWrapper>
          } />
          <Route path="/deals" element={
            <SuspenseWrapper>
              <Deals />
            </SuspenseWrapper>
          } />
          
          <Route path="/services/digital-transformation" element={
            <SuspenseWrapper>
              <DigitalTransformationServices />
            </SuspenseWrapper>
          } />
          

          <Route path="/booking" element={
            <SuspenseWrapper>
              <Booking />
            </SuspenseWrapper>
          } />

          {/* Legal pages */}
          <Route path="/terms" element={
            <SuspenseWrapper>
              <TermsOfService />
            </SuspenseWrapper>
          } />
          
          <Route path="/privacy" element={
            <SuspenseWrapper>
              <PrivacyPolicy />
            </SuspenseWrapper>
          } />
          
          <Route path="/sitemap" element={
            <SuspenseWrapper>
              <SiteMap />
            </SuspenseWrapper>
          } />
        </Routes>
      </Layout>
    </Router>
    </HelmetProvider>
  )
}

export default App