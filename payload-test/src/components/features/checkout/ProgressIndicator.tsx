interface ProgressIndicatorProps {
  currentStep: number
}

export default function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  const steps = [
    { number: 1, label: 'Wallet' },
    { number: 2, label: 'Shipping' },
    { number: 3, label: 'Payment' },
  ]

  return (
    <div className="flex items-center justify-center gap-2 md:gap-4">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                step.number <= currentStep
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
              aria-current={step.number === currentStep ? 'step' : undefined}
            >
              {step.number}
            </div>
            <span className="text-xs md:text-sm mt-2 hidden sm:block">{step.label}</span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-12 md:w-16 h-0.5 mx-1 md:mx-2 transition-colors ${
                step.number < currentStep ? 'bg-primary' : 'bg-muted'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}
