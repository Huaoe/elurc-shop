export default function DesignTokenTest() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-4xl font-bold text-gray-900">Design Token Test</h1>
      
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Color Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="h-20 rounded-lg" style={{ backgroundColor: 'var(--color-primary)' }}></div>
            <p className="text-sm">Primary</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 rounded-lg" style={{ backgroundColor: 'var(--color-success)' }}></div>
            <p className="text-sm">Success</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 rounded-lg" style={{ backgroundColor: 'var(--color-warning)' }}></div>
            <p className="text-sm">Warning</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 rounded-lg" style={{ backgroundColor: 'var(--color-error)' }}></div>
            <p className="text-sm">Error</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Typography</h2>
        <div className="space-y-2">
          <p className="font-sans">Inter Font Family (Sans)</p>
          <p className="font-mono">JetBrains Mono (Monospace)</p>
          <p className="text-sm">Small Text (14px)</p>
          <p className="text-base">Body Text (16px)</p>
          <p className="text-lg">Large Text (18px)</p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Spacing</h2>
        <div className="space-y-4">
          <div className="h-4" style={{ backgroundColor: 'var(--color-gray-300)', width: 'var(--spacing-xs)' }}></div>
          <div className="h-4" style={{ backgroundColor: 'var(--color-gray-300)', width: 'var(--spacing-sm)' }}></div>
          <div className="h-4" style={{ backgroundColor: 'var(--color-gray-300)', width: 'var(--spacing-md)' }}></div>
          <div className="h-4" style={{ backgroundColor: 'var(--color-gray-300)', width: 'var(--spacing-lg)' }}></div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Buttons</h2>
        <div className="flex gap-4">
          <button 
            className="px-6 py-3 rounded-lg font-semibold"
            style={{ 
              backgroundColor: 'var(--color-primary)', 
              color: 'var(--color-white)',
              height: 'var(--height-button-mobile)'
            }}
          >
            Primary Button
          </button>
          <button 
            className="px-6 py-3 rounded-lg font-semibold border-2"
            style={{ 
              borderColor: 'var(--color-primary)', 
              color: 'var(--color-primary)',
              height: 'var(--height-button-mobile)'
            }}
          >
            Secondary Button
          </button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Focus States</h2>
        <button className="px-6 py-3 rounded-lg bg-blue-600 text-white">
          Tab to test focus ring
        </button>
      </section>
    </div>
  );
}
