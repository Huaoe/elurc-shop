import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Phone, User } from 'lucide-react'

interface ShippingAddress {
  fullName: string
  streetAddress: string
  city: string
  postalCode: string
  phoneNumber: string
}

interface ShippingInfoProps {
  address: ShippingAddress
}

export default function ShippingInfo({ address }: ShippingInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <User className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-sm text-muted-foreground">Customer</p>
            <p className="font-medium">{address.fullName}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-sm text-muted-foreground">Delivery Address</p>
            <p className="font-medium">{address.streetAddress}</p>
            <p className="font-medium">
              {address.city}, {address.postalCode}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p className="font-medium">{address.phoneNumber}</p>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4 mt-4">
          <p className="text-sm font-medium mb-1">Estimated Delivery</p>
          <p className="text-sm text-muted-foreground">
            Your order will be shipped within 2-3 business days
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
