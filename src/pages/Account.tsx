import { useState } from 'react'
import colorBlack from '../assets/color_black.jpg'
import colorBlue from '../assets/color_blue.jpg'
import colorBrown from '../assets/color_brown.jpg'
import colorOrange from '../assets/color_orange.jpg'
import sampleOne from '../assets/sample1_1.jpg'
import sampleTwo from '../assets/sample1_2.jpg'

type OrderStatus =
  | 'In production'
  | 'Balance payment pending'
  | 'Out for delivery'
  | 'Completed'

type PayStatus = 'Deposit paid' | 'Fully paid'
type MockColorSwatchKey = keyof typeof mockColorSwatches

type MockOrder = {
  id: string
  orderNumber: string
  orderStatus: OrderStatus
  payStatus: PayStatus
  targetDeliveryDate: string
  productName: string
  productDescription: string
  deliveryAddress: string
  contactNumber: string
  quantity: number
  selectedColorKey: MockColorSwatchKey
  productImage: string
  price: number
}

// Edit mock swatch display names and picture imports here.
// Only color_black, color_blue, color_brown, and color_orange assets should be used as swatches.
const mockColorSwatches = {
  black: {
    name: 'Classic Black',
    image: colorBlack,
  },
  blue: {
    name: 'Deep Blue',
    image: colorBlue,
  },
  brown: {
    name: 'Cognac Brown',
    image: colorBrown,
  },
  orange: {
    name: 'Burnt Orange',
    image: colorOrange,
  },
} as const

const mockCustomer = {
  name: 'Sofamisu Customer',
  email: 'customer@example.com',
}

// Shopify customer orders and payment status will replace this mock order data later.
const mockOrders: MockOrder[] = [
  {
    id: 'order-1008',
    orderNumber: '#SF1008',
    orderStatus: 'Balance payment pending',
    payStatus: 'Deposit paid',
    targetDeliveryDate: '28 August 2026',
    productName: 'Sonoma Modular Sofa',
    productDescription:
      'Made-to-order three-seat modular sofa with deep cushions and low-profile timber legs.',
    deliveryAddress: '18 Orchard Boulevard, #12-08, Singapore 248645',
    contactNumber: '+65 9123 4587',
    quantity: 1,
    selectedColorKey: 'brown',
    productImage: sampleOne,
    price: 4280,
  },
  {
    id: 'order-1003',
    orderNumber: '#SF1003',
    orderStatus: 'Completed',
    payStatus: 'Fully paid',
    targetDeliveryDate: '12 May 2026',
    productName: 'Marais Lounge Sofa',
    productDescription:
      'Curved lounge sofa with tailored upholstery, plush back pillows, and softened arms.',
    deliveryAddress: '7 Tanjong Rhu Road, #09-21, Singapore 436887',
    contactNumber: '+65 8765 2041',
    quantity: 1,
    selectedColorKey: 'blue',
    productImage: sampleTwo,
    price: 3650,
  },
]
const mockAddresses: string[] = []

// Shopify Customer Account API session state will replace this mock flag later.
const isMockLoggedIn = false

export function Account() {
  const [orders, setOrders] = useState(mockOrders)
  const isPreviewingAccount =
    new URLSearchParams(window.location.search).get('preview') === '1'
  const shouldShowAccount = isMockLoggedIn || isPreviewingAccount

  const handlePayBalance = (orderId: string) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId ? { ...order, payStatus: 'Fully paid' } : order,
      ),
    )
  }

  if (!shouldShowAccount) {
    return (
      <main className="min-h-[calc(100vh-183px)] bg-[#F7F4EF] px-6 py-20 text-[#3A1C0F] lg:px-20">
        <section className="mx-auto max-w-3xl border border-[#BE8B48]/35 bg-[#EAE4DB] p-8 shadow-[0_24px_60px_rgba(58,28,15,0.10)]">
          <p className="font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light tracking-[0.28em] text-[#005A4F] uppercase">
            Account
          </p>
          <h1 className="mt-5 font-['Neue_Haas_Grotesk','Inter',sans-serif] text-4xl leading-tight font-light text-[#944E25]">
            Sign in to view your account
          </h1>
          <p className="mt-5 font-['Neue_Haas_Grotesk','Inter',sans-serif] text-base leading-8 font-light text-[#744026]">
            Your customer profile, order history, and saved addresses will
            appear here after sign in.
          </p>
          <a
            href="/login"
            className="mt-8 inline-flex bg-[#944E25] px-8 py-4 font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light tracking-[0.18em] text-[#F7F4EF] transition-colors duration-200 hover:bg-[#744026] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#BE8B48]"
          >
            Login
          </a>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-[calc(100vh-183px)] bg-[#F7F4EF] px-6 py-20 text-[#3A1C0F] lg:px-20">
      {/* Shopify Customer Account API profile, orders, addresses, and logout will be connected here later. */}
      <section className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-6 border-b border-[#BE8B48]/35 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light tracking-[0.28em] text-[#005A4F] uppercase">
              Account
            </p>
            <h1 className="mt-5 font-['Neue_Haas_Grotesk','Inter',sans-serif] text-5xl leading-tight font-light text-[#944E25]">
              {mockCustomer.name}
            </h1>
            <p className="mt-3 font-['Neue_Haas_Grotesk','Inter',sans-serif] text-base font-light text-[#744026]">
              {mockCustomer.email}
            </p>
          </div>
          <button
            type="button"
            className="w-fit border border-[#944E25] px-8 py-4 font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light tracking-[0.18em] text-[#944E25] transition-colors duration-200 hover:bg-[#944E25] hover:text-[#F7F4EF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#BE8B48]"
          >
            Logout
          </button>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[5fr_3fr]">
          <section className="bg-[#EAE4DB] p-8">
            <h2 className="font-['Neue_Haas_Grotesk','Inter',sans-serif] text-2xl font-light text-[#944E25]">
              Order history
            </h2>
            <div className="mt-6 space-y-6 font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light text-[#744026]">
              {orders.length > 0 ? (
                orders.map((order) => {
                  const deliveryLabel =
                    order.orderStatus === 'Completed'
                      ? 'Delivery date'
                      : 'Target delivery'
                  const colorSwatch = mockColorSwatches[order.selectedColorKey]

                  return (
                    <article
                      key={order.id}
                      className="border border-[#BE8B48]/30 bg-[#F7F4EF] p-6 shadow-[0_18px_42px_rgba(58,28,15,0.08)]"
                    >
                      <div className="grid gap-5 border-b border-[#BE8B48]/25 pb-5 xl:grid-cols-[0.8fr_2fr]">
                        <div>
                          <p className="text-xs tracking-[0.18em] text-[#005A4F] uppercase">
                            Order
                          </p>
                          <p className="mt-1 text-lg font-light text-[#944E25]">
                            {order.orderNumber}
                          </p>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-3 xl:text-right">
                          <div>
                            <p className="text-xs tracking-[0.16em] text-[#005A4F] uppercase">
                              Status
                            </p>
                            <p className="mt-1 font-semibold text-[#744026]">
                              {order.orderStatus}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs tracking-[0.16em] text-[#005A4F] uppercase">
                              Pay status
                            </p>
                            <p className="mt-1 font-semibold text-[#744026]">
                              {order.payStatus}
                            </p>
                          </div>
                          <div>
                            <p className="whitespace-nowrap text-xs tracking-[0.16em] text-[#005A4F] uppercase">
                              {deliveryLabel}
                            </p>
                            <p className="mt-1 font-semibold text-[#744026]">
                              {order.targetDeliveryDate}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-6 py-6 xl:grid-cols-[1fr_15rem]">
                        <div>
                          <div className="flex flex-col gap-5 sm:flex-row">
                            <img
                              src={order.productImage}
                              alt={order.productName}
                              className="h-28 w-28 shrink-0 object-cover object-center"
                            />
                            <div>
                              <h3 className="text-xl font-light text-[#944E25]">
                                {order.productName}
                              </h3>
                              <p className="mt-3 leading-7 text-[#744026]">
                                {order.productDescription}
                              </p>
                            </div>
                          </div>
                          <div className="mt-4 text-sm leading-6 text-[#744026]">
                            <p>
                              <span className="font-semibold text-[#944E25]">
                                Delivery address:
                              </span>{' '}
                              {order.deliveryAddress}
                            </p>
                            <p className="mt-2">
                              <span className="font-semibold text-[#944E25]">
                                Contact number:
                              </span>{' '}
                              {order.contactNumber}
                            </p>
                          </div>
                        </div>
                        <dl className="grid gap-3 text-[#744026] sm:grid-cols-3 xl:grid-cols-1">
                          <div>
                            <dt className="text-xs tracking-[0.16em] text-[#005A4F] uppercase">
                              Quantity
                            </dt>
                            <dd className="mt-1">{order.quantity}</dd>
                          </div>
                          <div>
                            <dt className="text-xs tracking-[0.16em] text-[#005A4F] uppercase">
                              Selected color
                            </dt>
                            <dd className="mt-1 flex items-center gap-2">
                              <img
                                src={colorSwatch.image}
                                alt=""
                                className="h-7 w-7 border border-[#BE8B48]/40 object-cover object-center"
                              />
                              <span>{colorSwatch.name}</span>
                            </dd>
                          </div>
                          <div>
                            <dt className="text-xs tracking-[0.16em] text-[#005A4F] uppercase">
                              Price
                            </dt>
                            <dd className="mt-1 text-lg text-[#944E25]">
                              ${order.price.toLocaleString()}
                            </dd>
                          </div>
                        </dl>
                      </div>

                      <div className="flex flex-col gap-4 border-t border-[#BE8B48]/25 pt-5 sm:flex-row sm:items-center sm:justify-between">
                        <a
                          href="/faq"
                          className="text-sm underline decoration-[#BE8B48]/70 underline-offset-4 transition-colors duration-200 hover:text-[#944E25] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#BE8B48]"
                        >
                          I have a question about this order
                        </a>
                        {order.payStatus === 'Deposit paid' && (
                          <button
                            type="button"
                            onClick={() => handlePayBalance(order.id)}
                            className="w-fit bg-[#944E25] px-6 py-3 text-xs font-light tracking-[0.16em] text-[#F7F4EF] transition-colors duration-200 hover:bg-[#744026] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#BE8B48]"
                          >
                            Pay Balance
                          </button>
                        )}
                      </div>
                    </article>
                  )
                })
              ) : (
                <p>No orders yet.</p>
              )}
            </div>
          </section>

          <section className="p-8">
            <h2 className="font-['Neue_Haas_Grotesk','Inter',sans-serif] text-2xl font-light text-[#944E25]">
              Saved addresses
            </h2>
            <div className="mt-6 font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm leading-7 font-light text-[#744026]">
              {mockAddresses.length > 0 ? (
                mockAddresses.map((address) => <p key={address}>{address}</p>)
              ) : (
                <p>No saved addresses yet.</p>
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}
