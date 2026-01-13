'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { shippingSchema, ShippingFormData } from '@/lib/validation/checkout'
import { ArrowLeft } from 'lucide-react'

interface ShippingStepProps {
  initialData?: ShippingFormData | null
  onSubmit: (data: ShippingFormData) => void
  onBack: () => void
}

export default function ShippingStep({ initialData, onSubmit, onBack }: ShippingStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    mode: 'onBlur',
    defaultValues: initialData || undefined,
  })

  return (
    <div className="bg-card rounded-lg border p-6 md:p-8">
      <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            {...register('fullName')}
            placeholder="John Doe"
            className="mt-1"
          />
          {errors.fullName && (
            <p className="text-sm text-destructive mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="streetAddress">Street Address *</Label>
          <Input
            id="streetAddress"
            {...register('streetAddress')}
            placeholder="123 Rue de Bretagne"
            className="mt-1"
          />
          {errors.streetAddress && (
            <p className="text-sm text-destructive mt-1">
              {errors.streetAddress.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              {...register('city')}
              placeholder="Quimper"
              className="mt-1"
            />
            {errors.city && (
              <p className="text-sm text-destructive mt-1">
                {errors.city.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="postalCode">Postal Code *</Label>
            <Input
              id="postalCode"
              {...register('postalCode')}
              placeholder="29000"
              className="mt-1"
            />
            {errors.postalCode && (
              <p className="text-sm text-destructive mt-1">
                {errors.postalCode.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="phoneNumber">Phone Number *</Label>
          <Input
            id="phoneNumber"
            {...register('phoneNumber')}
            placeholder="+33 6 12 34 56 78"
            className="mt-1"
          />
          {errors.phoneNumber && (
            <p className="text-sm text-destructive mt-1">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="button" variant="outline" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <Button type="submit" className="flex-1" disabled={!isValid}>
            Continue to Payment
          </Button>
        </div>
      </form>
    </div>
  )
}
