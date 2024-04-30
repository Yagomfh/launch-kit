import { api } from '@/services'
import { VStack } from '@chakra-ui/react'
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useCallback } from 'react'

const stripePromise = loadStripe('pk_test_wD3Trdz2t0mjZLo5G8l1x5S900kEMsTETB')

const Checkout = () => {
  const fetchClientSecret = useCallback(async () => {
    // Create a Checkout Session
    return api
      .post('/create-checkout-session')
      .then((data) => data.data.clientSecret)
  }, [])

  const options = { fetchClientSecret }

  return (
    <div
      id="checkout"
      style={{
        padding: '2rem'
      }}
    >
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}

export default Checkout
