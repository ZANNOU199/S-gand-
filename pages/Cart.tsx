
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../App';
import { ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, total } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="bg-background-dark min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
        <div className="text-white/10 mb-8">
          <ShoppingBag size={80} md:size={96} />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Your bag is empty</h2>
        <p className="text-sand/50 mb-10 max-w-sm text-sm">Items added to your bag will appear here. Discover our heritage collections to find your perfect match.</p>
        <Link to="/" className="bg-primary text-background-dark px-10 py-4 rounded-lg font-black uppercase tracking-widest text-xs hover:bg-white transition-all w-full sm:w-auto">
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background-dark min-h-screen pt-8 md:pt-12 pb-24 text-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-8 md:mb-12 uppercase">Shopping Bag</h1>
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* List */}
          <div className="flex-1 space-y-4 w-full">
            {cart.map(item => (
              <div key={item.id} className="flex flex-col sm:flex-row gap-4 md:gap-6 bg-charcoal/30 p-4 md:p-6 rounded-xl border border-white/5">
                <div className="w-full sm:w-32 aspect-square rounded-lg overflow-hidden shrink-0 bg-charcoal">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-2">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="text-base md:text-lg font-bold text-white mb-1 leading-tight">{item.name}</h3>
                      <p className="text-[10px] text-sand/50 font-medium uppercase tracking-widest">{item.variantName}</p>
                    </div>
                    <p className="text-lg md:text-xl font-bold text-primary shrink-0">€{item.price * item.quantity}</p>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center gap-4 bg-white/5 px-3 py-2 rounded-lg border border-white/10">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-primary transition-colors">
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-bold text-white text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-primary transition-colors">
                        <Plus size={14} />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-[10px] font-black text-sand/50 hover:text-red-500 transition-colors uppercase flex items-center gap-1.5 p-2"
                    >
                      <Trash2 size={14} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Sidebar - Mobile Sticky Bottom Style or Standard Stack */}
          <div className="w-full lg:w-96 bg-charcoal p-6 md:p-8 rounded-xl border border-white/10 lg:sticky lg:top-32">
            <h3 className="text-lg md:text-xl font-bold mb-6 md:mb-8 uppercase tracking-widest">Order Summary</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sand/60 text-xs md:text-sm">
                <span>Subtotal</span>
                <span className="text-white font-medium">€{total}.00</span>
              </div>
              <div className="flex justify-between text-sand/60 text-xs md:text-sm">
                <span>Estimated Shipping</span>
                <span className="text-white font-medium">Free</span>
              </div>
              <div className="pt-4 border-t border-white/10 flex justify-between items-baseline">
                <span className="text-white font-bold uppercase text-sm">Total</span>
                <span className="text-primary font-black text-2xl md:text-3xl">€{total}.00</span>
              </div>
            </div>
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-primary text-background-dark font-black py-4 md:py-5 rounded-lg uppercase tracking-widest text-[11px] md:text-sm hover:bg-white transition-all shadow-xl mb-4"
            >
              Checkout Now
            </button>
            <p className="text-[9px] md:text-[10px] text-center text-sand/40 uppercase tracking-widest leading-loose">
              Taxes and shipping calculated at checkout. <br/> Secure payment guaranteed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
