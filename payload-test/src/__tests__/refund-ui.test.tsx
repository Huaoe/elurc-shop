import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { RefundForm } from '@/components/features/admin/RefundForm'
import { RefundConfirmationDialog } from '@/components/features/admin/RefundConfirmationDialog'
import { RefundHistory } from '@/components/features/admin/RefundHistory'

global.fetch = vi.fn()

describe('RefundForm', () => {
  const mockProps = {
    orderId: 'test-order-id',
    orderNumber: 'ORD-123',
    orderAmount: 10000000,
    customerWallet: 'mock-wallet-address',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render form fields', () => {
    render(<RefundForm {...mockProps} />)
    
    expect(screen.getByLabelText(/Order Number/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Order Amount/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Refund Amount/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Wallet Address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Refund Reason/i)).toBeInTheDocument()
  })

  it('should display order information', () => {
    render(<RefundForm {...mockProps} />)
    
    expect(screen.getByDisplayValue('ORD-123')).toBeInTheDocument()
    expect(screen.getByDisplayValue('10.00 ELURC')).toBeInTheDocument()
  })

  it('should validate refund amount', async () => {
    render(<RefundForm {...mockProps} />)
    
    const refundInput = screen.getByLabelText(/Refund Amount/i)
    fireEvent.change(refundInput, { target: { value: '15' } })
    
    expect(refundInput).toHaveAttribute('max', '10')
  })

  it('should allow wallet address override', () => {
    render(<RefundForm {...mockProps} />)
    
    const walletInput = screen.getByLabelText(/Wallet Address/i)
    expect(walletInput).toBeDisabled()
    
    const overrideButton = screen.getByText('Override')
    fireEvent.click(overrideButton)
    
    expect(walletInput).not.toBeDisabled()
  })

  it('should submit refund request', async () => {
    const mockOnSuccess = vi.fn()
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    } as Response)

    render(<RefundForm {...mockProps} onSuccess={mockOnSuccess} />)
    
    fireEvent.change(screen.getByLabelText(/Refund Amount/i), { target: { value: '5' } })
    fireEvent.change(screen.getByLabelText(/Refund Reason/i), { target: { value: 'Test refund' } })
    
    fireEvent.click(screen.getByText('Process Refund'))
    
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/admin/refunds/process', expect.any(Object))
      expect(mockOnSuccess).toHaveBeenCalled()
    })
  })

  it('should display error on failed submission', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Refund failed' }),
    } as Response)

    render(<RefundForm {...mockProps} />)
    
    fireEvent.change(screen.getByLabelText(/Refund Amount/i), { target: { value: '5' } })
    fireEvent.change(screen.getByLabelText(/Refund Reason/i), { target: { value: 'Test' } })
    fireEvent.click(screen.getByText('Process Refund'))
    
    await waitFor(() => {
      expect(screen.getByText(/Refund failed/i)).toBeInTheDocument()
    })
  })
})

describe('RefundConfirmationDialog', () => {
  const mockProps = {
    open: true,
    onOpenChange: vi.fn(),
    orderNumber: 'ORD-123',
    refundAmount: 5000000,
    walletAddress: 'mock-wallet-address',
    reason: 'Test refund',
    onConfirm: vi.fn(),
  }

  it('should display refund details', () => {
    render(<RefundConfirmationDialog {...mockProps} />)
    
    expect(screen.getByText('ORD-123')).toBeInTheDocument()
    expect(screen.getByText('5.00 ELURC')).toBeInTheDocument()
    expect(screen.getByText('Test refund')).toBeInTheDocument()
  })

  it('should call onConfirm when confirmed', () => {
    render(<RefundConfirmationDialog {...mockProps} />)
    
    fireEvent.click(screen.getByText('Confirm Refund'))
    expect(mockProps.onConfirm).toHaveBeenCalled()
  })

  it('should call onOpenChange when cancelled', () => {
    render(<RefundConfirmationDialog {...mockProps} />)
    
    fireEvent.click(screen.getByText('Cancel'))
    expect(mockProps.onOpenChange).toHaveBeenCalledWith(false)
  })
})

describe('RefundHistory', () => {
  it('should display loading state', () => {
    render(<RefundHistory orderId="test-order" />)
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument()
  })

  it('should display refund history', async () => {
    const mockRefunds = [
      {
        id: '1',
        refundNumber: 'REF-001',
        status: 'completed',
        amount: 5000000,
        walletAddress: 'mock-wallet',
        reason: 'Overpayment',
        transactionSignature: 'mock-sig',
        createdAt: new Date().toISOString(),
      },
    ]

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ refunds: mockRefunds }),
    } as Response)

    render(<RefundHistory orderId="test-order" />)
    
    await waitFor(() => {
      expect(screen.getByText('REF-001')).toBeInTheDocument()
      expect(screen.getByText('5.00 ELURC')).toBeInTheDocument()
      expect(screen.getByText('Overpayment')).toBeInTheDocument()
    })
  })

  it('should display empty state', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ refunds: [] }),
    } as Response)

    render(<RefundHistory orderId="test-order" />)
    
    await waitFor(() => {
      expect(screen.getByText(/No refunds found/i)).toBeInTheDocument()
    })
  })
})
