import React from 'react';
import { 
  CreditCard, 
  Smartphone, 
  Wallet, 
  Banknote, 
  Gift,
  Check,
  Loader,
  Shield
} from 'lucide-react';

interface PaymentStepProps {
  paymentMethod: string;
  onPaymentMethodChange: (method: string) => void;
  promoCode: string;
  onPromoCodeChange: (code: string) => void;
  turf: any;
  selectedDate: Date;
  selectedSlots: string[];
  totalAmount: number;
  isProcessing: boolean;
  onProcessPayment: () => void;
}

const PaymentStep: React.FC<PaymentStepProps> = ({
  paymentMethod,
  onPaymentMethodChange,
  promoCode,
  onPromoCodeChange,
  turf,
  selectedDate,
  selectedSlots,
  totalAmount,
  isProcessing,
  onProcessPayment
}) => {
  const [promoApplied, setPromoApplied] = React.useState(false);
  const [discount, setDiscount] = React.useState(0);

  const paymentMethods = [
    { id: 'upi', name: 'UPI Payment', icon: Smartphone, description: 'Pay using UPI apps like GPay, PhonePe' },
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, Rupay accepted' },
    { id: 'wallet', name: 'Digital Wallet', icon: Wallet, description: 'Paytm, PhonePe, Amazon Pay' },
    { id: 'cash', name: 'Cash on Turf', icon: Banknote, description: 'Pay directly at the venue' }
  ];

  const applyPromoCode = () => {
    const isValid = Math.random() > 0.5;
    if (isValid) {
      const discountAmount = Math.floor(totalAmount * 0.1);
      setDiscount(discountAmount);
      setPromoApplied(true);
    } else {
      alert('Invalid promo code');
    }
  };

  const finalAmount = totalAmount - discount;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Payment</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Payment Options */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
          <div className="space-y-3 mb-6">
            {paymentMethods.map((method) => {
              const IconComponent = method.icon;
              return (
                <label
                  key={method.id}
                  className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    paymentMethod === method.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={paymentMethod === method.id}
                    onChange={(e) => onPaymentMethodChange(e.target.value)}
                    className="sr-only"
                  />
                  <IconComponent className={`w-6 h-6 mr-4 ${
                    paymentMethod === method.id ? 'text-blue-600' : 'text-gray-400'
                  }`} />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{method.name}</div>
                    <div className="text-sm text-gray-600">{method.description}</div>
                  </div>
                  {paymentMethod === method.id && (
                    <Check className="w-5 h-5 text-blue-600" />
                  )}
                </label>
              );
            })}
          </div>

          {/* Promo Code Section */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Gift className="w-5 h-5 mr-2 text-blue-600" />
              Have a Promo Code?
            </h4>
            <div className="flex space-x-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => onPromoCodeChange(e.target.value)}
                placeholder="Enter code"
                disabled={promoApplied}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              />
              <button
                onClick={applyPromoCode}
                disabled={!promoCode || promoApplied}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Apply
              </button>
            </div>
            {promoApplied && (
              <div className="mt-2 text-green-600 text-sm flex items-center">
                <Check className="w-4 h-4 mr-1" />
                Promo code applied! You saved ₹{discount}
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
          <div className="bg-gray-50 rounded-xl p-6 space-y-4">
            {/* Turf Details */}
            <div>
              <h4 className="font-semibold text-gray-900">{turf.name}</h4>
              <p className="text-gray-600 text-sm">{turf.location}</p>
              <p className="text-gray-600 text-sm">
                {selectedDate.toLocaleDateString('en-IN', { 
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long'
                })}
              </p>
            </div>

            {/* Slot Details */}
            <div className="border-t border-gray-200 pt-4">
              <h5 className="font-medium text-gray-900 mb-2">Time Slots</h5>
              {selectedSlots.map((slot) => (
                <div key={slot} className="flex justify-between text-sm mb-1">
                  <span>{slot}</span>
                  <span>₹{turf.pricePerHour}</span>
                </div>
              ))}
            </div>

            {/* Pricing Breakdown */}
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal ({selectedSlots.length} hours)</span>
                <span>₹{totalAmount}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span>Taxes & Fees</span>
                <span>₹0</span>
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-blue-600">₹{finalAmount}</span>
              </div>
            </div>

            {/* Security Notice */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Shield className="w-4 h-4 text-green-600" />
                <span>Secure payment powered by industry standards</span>
              </div>
            </div>

            {/* Pay Button */}
            <button
              onClick={onProcessPayment}
              disabled={!paymentMethod || isProcessing}
              className={`w-full py-4 rounded-xl font-semibold transition-all ${
                paymentMethod && !isProcessing
                  ? 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Processing Payment...</span>
                </div>
              ) : (
                `Pay ₹${finalAmount}`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStep;