
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../App';
import { ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, total } = useCart();

  if (cart.length === 0) {
    return (
      <div className="bg-background-dark min-h-[70vh] flex flex-col items-center justify-center text-center p-8">
        <div className="text-white/10 mb-8">
          <ShoppingBag size={96} />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Your bag is empty</h2>
        <p className="text-sand/50 mb-10 max-w-sm">Items added to your bag will appear here. Discover our heritage collections to find your perfect match.</p>
        <Link to="/" className="bg-primary text-background-dark px-10 py-4 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-white transition-all">
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background-dark min-h-screen pt-12 pb-24 text-white">
      <div className="max-w-[1440px] mx-auto px-8">
        <h1 className="text-4xl font-black tracking-tight mb-12 uppercase">Shopping Bag</h1>
        
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* List */}
          <div className="flex-1 space-y-4 w-full">
            {cart.map(item => (
              <div key={item.id} className="flex flex-col sm:flex-row gap-6 bg-charcoal/30 p-6 rounded-xl border border-white/5">
                <div className="w-full sm:w-32 aspect-square rounded-lg overflow-hidden shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                      <p className="text-xs text-sand/50 font-medium uppercase tracking-widest">{item.variantName}</p>
                    </div>
                    <p className="text-xl font-bold text-primary">€{item.price * item.quantity}</p>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center gap-4 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="hover:text-primary transition-colors">
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-bold text-white">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="hover:text-primary transition-colors">
                        <Plus size={14} />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs font-bold text-sand/50 hover:text-red-500 transition-colors uppercase flex items-center gap-1.5"
                    >
                      <Trash2 size={14} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Sidebar */}
          <div className="w-full lg:w-96 bg-charcoal p-8 rounded-xl border border-white/10 sticky top-32">
            <h3 className="text-xl font-bold mb-8 uppercase tracking-widest">Order Summary</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sand/60">
                <span>Subtotal</span>
                <span className="text-white font-medium">€{total}.00</span>
              </div>
              <div className="flex justify-between text-sand/60">
                <span>Estimated Shipping</span>
                <span className="text-white font-medium">Free</span>
              </div>
              <div className="pt-4 border-t border-white/10 flex justify-between items-baseline">
                <span className="text-white font-bold">Total</span>
                <span className="text-primary font-black text-3xl">€{total}.00</span>
              </div>
            </div>
            <button className="w-full bg-primary text-background-dark font-bold py-5 rounded-lg uppercase tracking-widest text-sm hover:bg-white transition-all shadow-xl mb-4">
              Checkout Now
            </button>
            <p className="text-[10px] text-center text-sand/40 uppercase tracking-widest leading-loose">
              Taxes and shipping calculated at checkout. <br/> Secure payment guaranteed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
