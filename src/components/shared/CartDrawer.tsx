import { useCart } from "../../context/CartContext";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();

  return (
    <>
      {/* Dimmer */}
      <div
        className={`sc-nav-dimmer ${isOpen ? "sc-open" : ""}`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        className={`sc-cart-panel ${isOpen ? "sc-open" : ""}`}
      >
        {/* Header */}
        <div className="sc-cart-header">
          <div className="sc-cart-title">
            YOUR BAG
            {items.length > 0 && (
              <span className="sc-cart-count">{items.reduce((s, i) => s + i.quantity, 0)}</span>
            )}
          </div>
          <button className="sc-nav-close sc-cart-close-btn" onClick={closeCart} aria-label="Close cart">×</button>
        </div>

        {/* Body */}
        <div className="sc-cart-body">
          {items.length === 0 ? (
            <div className="sc-cart-empty">
              <div className="sc-cart-empty-icon">◻</div>
              <div className="sc-cart-empty-text">YOUR BAG IS EMPTY</div>
              <div className="sc-cart-empty-sub">Add items to get started</div>
              <button className="sc-btn-primary mt-8" onClick={closeCart}>CONTINUE SHOPPING</button>
            </div>
          ) : (
            <ul className="sc-cart-list">
              {items.map((item) => (
                <li key={`${item.product.id}-${item.size}`} className="sc-cart-item">
                  <div className="sc-cart-item-img">
                    <img
                      src={`${item.product.image}${item.product.image.includes("?") ? "&" : "?"}fm=webp&q=70&w=200`}
                      alt={item.product.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1556821840-3a63f95609a7?fm=webp&q=70&w=200";
                      }}
                    />
                  </div>
                  <div className="sc-cart-item-info">
                    <div className="sc-cart-item-name">{item.product.name}</div>
                    <div className="sc-cart-item-meta">SIZE: {item.size}</div>
                    <div className="sc-cart-item-price">${item.product.price}</div>
                    <div className="sc-cart-qty-row">
                      <button
                        className="sc-cart-qty-btn"
                        onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >−</button>
                      <span className="sc-cart-qty-val">{item.quantity}</span>
                      <button
                        className="sc-cart-qty-btn"
                        onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >+</button>
                      <button
                        className="sc-cart-remove"
                        onClick={() => removeFromCart(item.product.id, item.size)}
                        aria-label={`Remove ${item.product.name}`}
                      >REMOVE</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="sc-cart-footer">
            <div className="sc-cart-subtotal-row">
              <span className="sc-cart-subtotal-label">SUBTOTAL</span>
              <span className="sc-cart-subtotal-val">${subtotal.toFixed(2)}</span>
            </div>
            <p className="sc-cart-footer-note">Shipping calculated at checkout</p>
            <button className="sc-btn-primary sc-cart-checkout-btn">
              PROCEED TO CHECKOUT →
            </button>
            <button className="sc-cart-clear" onClick={clearCart}>Clear bag</button>
          </div>
        )}
      </aside>
    </>
  );
}
