const { useState, useEffect } = React;

// George's Pizza - Complete Online Ordering System
// 201 W. Girard Ave, Philadelphia - Est. 1984

// =============================================================================
// SITE STATUS URL (for maintenance mode toggle via GitHub)
// =============================================================================

const STATUS_URL = 'https://deme-collab.github.io/georges-pizza/status.json';

// =============================================================================
// MAINTENANCE PAGE COMPONENT
// =============================================================================

function MaintenancePage({ message }) {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      fontFamily: "'Oswald', 'Arial Narrow', sans-serif"
    }}>
      <div style={{ 
        background: 'white', 
        borderRadius: 12, 
        padding: 40, 
        maxWidth: 500, 
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        {/* Logo */}
        <div style={{ marginBottom: 24 }}>
          <img 
            src="logo.png" 
            alt="George's Pizza" 
            style={{ maxWidth: 200, height: 'auto' }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
        
        {/* Message */}
        <div style={{ 
          background: '#FFF3E0', 
          border: '2px solid #FF9800', 
          borderRadius: 8, 
          padding: 20, 
          marginBottom: 24 
        }}>
          <p style={{ 
            fontSize: 18, 
            color: '#333', 
            margin: 0,
            lineHeight: 1.5
          }}>
            {message || "We're experiencing technical difficulties. Please call us to place your order."}
          </p>
        </div>
        
        {/* Phone Numbers */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 14, color: '#666', margin: '0 0 10px 0' }}>Call us to order:</p>
          <a href="tel:215-236-5288" style={{ 
            display: 'block',
            fontSize: 28, 
            fontWeight: 700, 
            color: '#C41E3A', 
            textDecoration: 'none',
            marginBottom: 8
          }}>
            📞 (215) 236-5288
          </a>
          <a href="tel:215-236-6035" style={{ 
            display: 'block',
            fontSize: 20, 
            color: '#666', 
            textDecoration: 'none'
          }}>
            (215) 236-6035
          </a>
        </div>
        
        {/* Hours */}
        <div style={{ 
          background: '#f5f5f5', 
          borderRadius: 8, 
          padding: 16, 
          marginBottom: 24,
          textAlign: 'left'
        }}>
          <p style={{ fontWeight: 700, margin: '0 0 10px 0', textAlign: 'center' }}>Hours of Operation</p>
          <div style={{ fontSize: 14, lineHeight: 1.8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Mon - Thu:</span><span>11am - 10pm</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Fri - Sat:</span><span>11am - 11pm</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Sunday:</span><span>2pm - 10pm</span>
            </div>
          </div>
        </div>
        
        {/* Alternative Ordering */}
        <div>
          <p style={{ fontSize: 14, color: '#666', margin: '0 0 12px 0' }}>Or order through:</p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a 
              href="https://www.doordash.com/store/george's-pizza-philadelphia-24587019/34286951/?event_type=autocomplete&pickup=false"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '8px 16px',
                background: '#FF3008',
                color: 'white',
                borderRadius: 6,
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 600
              }}
            >
              DoorDash
            </a>
            <a 
              href="https://www.grubhub.com/restaurant/georges-pizza-201-w-girard-ave-philadelphia/68611"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '8px 16px',
                background: '#F63440',
                color: 'white',
                borderRadius: 6,
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 600
              }}
            >
              GrubHub
            </a>
            <a 
              href="https://slicelife.com/restaurants/pa/philadelphia/19123/george-s-pizza-philadelphia/menu"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '8px 16px',
                background: '#E85D26',
                color: 'white',
                borderRadius: 6,
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 600
              }}
            >
              Slice
            </a>
          </div>
        </div>
        
        {/* Address */}
        <p style={{ 
          fontSize: 12, 
          color: '#999', 
          marginTop: 24,
          marginBottom: 0 
        }}>
          201 W. Girard Ave, Philadelphia, PA • Est. 1984
        </p>
      </div>
    </div>
  );
}

// =============================================================================
// STORE HOURS & HOLIDAY CONFIGURATION
// =============================================================================

const STORE_HOURS = {
  0: { open: 14, close: 22 },  // Sun: 2pm-10pm
  1: { open: 11, close: 22 },  // Mon: 11am-10pm
  2: { open: 11, close: 22 },  // Tue: 11am-10pm
  3: { open: 11, close: 22 },  // Wed: 11am-10pm
  4: { open: 11, close: 22 },  // Thu: 11am-10pm
  5: { open: 11, close: 23 },  // Fri: 11am-11pm
  6: { open: 11, close: 23 },  // Sat: 11am-11pm
};

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Format hour to readable string
function formatHour(hour) {
  if (hour === 0 || hour === 12) return '12pm';
  if (hour < 12) return `${hour}am`;
  return `${hour - 12}pm`;
}

// =============================================================================
// HOLIDAY CALCULATIONS
// =============================================================================

// Calculate Easter Sunday (Computus algorithm)
function getEasterSunday(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return { month, day };
}

// Get Thanksgiving (4th Thursday of November)
function getThanksgiving(year) {
  const nov1 = new Date(year, 10, 1);
  const dayOfWeek = nov1.getDay();
  const firstThursday = dayOfWeek <= 4 ? (4 - dayOfWeek + 1) : (11 - dayOfWeek + 4 + 1);
  return { month: 10, day: firstThursday + 21 };
}

// Get Memorial Day (last Monday of May)
function getMemorialDay(year) {
  const may31 = new Date(year, 4, 31);
  const dayOfWeek = may31.getDay();
  const lastMonday = dayOfWeek === 1 ? 31 : 31 - (dayOfWeek === 0 ? 6 : dayOfWeek - 1);
  return { month: 4, day: lastMonday };
}

// Check if a specific date is a holiday
function isHoliday(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  
  // Fixed holidays
  if (month === 0 && day === 1) return "New Year's Day";
  if (month === 6 && day === 4) return "Independence Day";
  if (month === 11 && day === 25) return "Christmas Day";
  
  // Easter Sunday
  const easter = getEasterSunday(year);
  if (month === easter.month && day === easter.day) return "Easter Sunday";
  
  // Thanksgiving
  const thanksgiving = getThanksgiving(year);
  if (month === thanksgiving.month && day === thanksgiving.day) return "Thanksgiving";
  
  // Memorial Day
  const memorial = getMemorialDay(year);
  if (month === memorial.month && day === memorial.day) return "Memorial Day";
  
  return null;
}

// =============================================================================
// STORE STATUS
// =============================================================================

// Get store status with details
function getStoreStatus() {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const hours = STORE_HOURS[day];
  
  // Check if today is a holiday
  const holiday = isHoliday(now);
  if (holiday) {
    // Find next non-holiday opening
    for (let i = 1; i <= 7; i++) {
      const nextDate = new Date(now);
      nextDate.setDate(now.getDate() + i);
      if (!isHoliday(nextDate)) {
        const nextDay = nextDate.getDay();
        const nextHours = STORE_HOURS[nextDay];
        const dayName = i === 1 ? 'tomorrow' : DAY_NAMES[nextDay];
        return {
          isOpen: false,
          message: `Closed for ${holiday} • Opens ${dayName} at ${formatHour(nextHours.open)}`,
          isHoliday: true
        };
      }
    }
  }
  
  const isOpen = hour >= hours.open && hour < hours.close;
  
  if (isOpen) {
    return {
      isOpen: true,
      message: `Open until ${formatHour(hours.close)}`,
      isHoliday: false
    };
  } else {
    // If before today's opening
    if (hour < hours.open) {
      return {
        isOpen: false,
        message: `Opens today at ${formatHour(hours.open)}`,
        isHoliday: false
      };
    }
    
    // After closing, find next opening (check for holidays)
    for (let i = 1; i <= 7; i++) {
      const nextDate = new Date(now);
      nextDate.setDate(now.getDate() + i);
      if (!isHoliday(nextDate)) {
        const nextDay = nextDate.getDay();
        const nextHours = STORE_HOURS[nextDay];
        const dayName = i === 1 ? 'tomorrow' : DAY_NAMES[nextDay];
        return {
          isOpen: false,
          message: `Opens ${dayName} at ${formatHour(nextHours.open)}`,
          isHoliday: false
        };
      }
    }
    
    return {
      isOpen: false,
      message: `Opens soon`,
      isHoliday: false
    };
  }
}

// Phone number formatting helper
const formatPhoneNumber = (value) => {
  // Remove all non-digits
  const digits = value.replace(/\D/g, '');
  
  // Limit to 10 digits
  const limited = digits.slice(0, 10);
  
  // Format as (XXX) XXX-XXXX
  if (limited.length === 0) return '';
  if (limited.length <= 3) return `(${limited}`;
  if (limited.length <= 6) return `(${limited.slice(0, 3)}) ${limited.slice(3)}`;
  return `(${limited.slice(0, 3)}) ${limited.slice(3, 6)}-${limited.slice(6)}`;
};

// Check if phone is valid (10 digits)
const isValidPhone = (phone) => {
  const digits = phone.replace(/\D/g, '');
  return digits.length === 10;
};

function GeorgesPizza() {
  const [orderType, setOrderType] = useState('pickup');
  const [cart, setCart] = useState([]);
  const [currentView, setCurrentView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState({ street: '', apt: '', city: 'Philadelphia', zip: '' });
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(null);
  const [emailConsent, setEmailConsent] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [driverTip, setDriverTip] = useState(0);
  const [cartNotification, setCartNotification] = useState(null);
  const [lunchCustomizing, setLunchCustomizing] = useState(null);
  const [familyDealCustomizing, setFamilyDealCustomizing] = useState(null);
  const [storeStatus, setStoreStatus] = useState(() => getStoreStatus());
  const [siteEnabled, setSiteEnabled] = useState(true);
  const [siteMessage, setSiteMessage] = useState('');
  const [siteStatusLoaded, setSiteStatusLoaded] = useState(false);
  const [lunchAvailable, setLunchAvailable] = useState(() => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    return day >= 1 && day <= 5 && hour >= 11 && hour < 14;
  });
  
  // Check site status from GitHub (maintenance mode toggle)
  useEffect(() => {
    const checkSiteStatus = async () => {
      try {
        const response = await fetch(`${STATUS_URL}?t=${Date.now()}`);
        if (response.ok) {
          const data = await response.json();
          setSiteEnabled(data.siteEnabled !== false);
          setSiteMessage(data.message || '');
        }
      } catch (error) {
        console.log('Could not fetch site status, defaulting to enabled');
        setSiteEnabled(true);
      }
      setSiteStatusLoaded(true);
    };
    
    checkSiteStatus();
    // Recheck every 5 minutes
    const interval = setInterval(checkSiteStatus, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);
  
  // Update store status every minute
  useEffect(() => {
    const interval = setInterval(() => setStoreStatus(getStoreStatus()), 60000);
    return () => clearInterval(interval);
  }, []);
  
  // Update lunch availability every minute
  useEffect(() => {
    const checkLunch = () => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();
      setLunchAvailable(day >= 1 && day <= 5 && hour >= 11 && hour < 14);
    };
    const interval = setInterval(checkLunch, 60000);
    return () => clearInterval(interval);
  }, []);
  
  // Show loading while checking site status
  if (!siteStatusLoaded) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#1a1a1a'
      }}>
        <div style={{ textAlign: 'center' }}>
          <img 
            src="logo.png" 
            alt="George's Pizza" 
            style={{ maxWidth: 200, marginBottom: 20 }}
            onError={(e) => e.target.style.display = 'none'}
          />
          <div style={{ color: 'white', fontSize: 16 }}>Loading...</div>
        </div>
      </div>
    );
  }
  
  // Show maintenance page if site is disabled
  if (!siteEnabled) {
    return <MaintenancePage message={siteMessage} />;
  }

  // Delivery zone ZIP codes, minimum, fee, and tax
  const DELIVERY_ZONES = ['19122', '19123', '19125', '19106'];
  const DELIVERY_MINIMUM = 15;
  const DELIVERY_FEE = 3;
  const TAX_RATE = 0.08; // 8% Philadelphia sales tax

  const addToCart = (item) => {
    setCart([...cart, { ...item, id: Date.now() }]);
    // Show cart notification
    setCartNotification(item.name);
    setTimeout(() => setCartNotification(null), 2500);
  };

  const removeFromCart = (id) => setCart(cart.filter(item => item.id !== id));
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  // ============ MENU DATA ============
  
  const categories = [
    { id: 'pizza', name: 'Pizza', desc: 'Classic & White Pies' },
    { id: 'steaks', name: 'Cheesesteaks', desc: 'Beef & Chicken' },
    { id: 'hoagies', name: 'Hoagies', desc: 'Cold Subs & Hot Sandwiches' },
    { id: 'sandwiches', name: 'Sandwiches & Clubs', desc: 'Cold Sandwiches & Double Clubs' },
    { id: 'wings', name: 'Wings & Fingers', desc: 'Buffalo, BBQ & More' },
    { id: 'stromboli', name: 'Strombolis', desc: 'Stuffed & Rolled' },
    { id: 'salads', name: 'Salads', desc: 'Fresh & Hearty' },
    { id: 'pasta-seafood', name: 'Pasta & Seafood', desc: 'Italian & Fried Platters' },
    { id: 'burgers', name: 'Burgers', desc: 'Classic American' },
    { id: 'gyros', name: 'Gyros & Wraps', desc: 'Greek & More' },
    { id: 'sides', name: 'Sides & Apps', desc: 'Fries, Rings & More' },
    { id: 'drinks', name: 'Drinks & Desserts', desc: 'Beverages & Sweets' },
  ];

  const lunchSpecials = [
    { num: 1, name: 'Chicken Parm, Fries & Soda', price: 10, hasLunchFriesSodaMods: true },
    { num: 2, name: 'Cheese Steak, Fries & Soda', price: 10, hasLunchSteakFriesSodaMods: true },
    { num: 3, name: 'Turkey Hoagie, Fries & Soda', price: 10, hasLunchHoagieFriesSodaMods: true },
    { num: 4, name: 'Chicken Cheese Steak, Fries & Soda', price: 10, hasLunchSteakFriesSodaMods: true },
    { num: 5, name: '4 Fingers, Fries & Soda', price: 10, hasLunchFingersFriesSodaMods: true },
    { num: 6, name: 'Pizza Steak, Fries & Soda', price: 10, hasLunchSteakFriesSodaMods: true },
    { num: 7, name: 'Chef Salad & Can Soda', price: 10, hasLunchSaladSodaMods: true, saladType: 'chef' },
    { num: 8, name: 'Small Plain Pizza, Fries & Soda', price: 10, hasLunchPizzaFriesSodaMods: true },
    { num: 9, name: '4 Wings, Fries & Soda', price: 10, hasLunchWingsFriesSodaMods: true },
    { num: 10, name: 'Cheeseburger, Fries & Soda', price: 10, hasLunchBurgerFriesSodaMods: true },
    { num: 14, name: 'Grilled Chicken Caesar & Soda', price: 10, hasLunchSaladSodaMods: true, saladType: 'caesar' },
    { num: 15, name: 'Grilled Chicken Wrap, Fries & Soda', price: 10, hasLunchFriesSodaMods: true },
  ];

  const familyDeals = [
    { id: 1, name: '2 Large Plain Pizzas', price: 21, desc: 'Two 14" pies', badge: 'Best Value', hasTwoLargePizzaMods: true },
  ];

  // Pizza menu - consolidated with size selector
  const pizzaMenu = {
    classic: [
      { name: 'Plain', desc: 'Tomato Sauce & Mozzarella Cheese', prices: { small: 9, large: 12, xlarge: 15 } },
      { name: 'Pepperoni', desc: 'Choose Beef or Pork Pepperoni', prices: { small: 11, large: 14, xlarge: 17 }, hasPepperoniChoice: true },
      { name: 'Mushroom', desc: 'Fresh Sliced Mushrooms', prices: { small: 11, large: 14, xlarge: 17 } },
      { name: 'Sausage', desc: 'Italian Sausage', prices: { small: 11, large: 14, xlarge: 17 } },
      { name: 'Ham', desc: 'Sliced Ham', prices: { small: 11, large: 14, xlarge: 17 } },
      { name: 'Onion', desc: 'Fresh Onions', prices: { small: 11, large: 14, xlarge: 17 } },
      { name: 'Green Peppers', desc: 'Fresh Green Peppers', prices: { small: 11, large: 14, xlarge: 17 } },
      { name: 'Ground Beef', desc: 'Seasoned Ground Beef', prices: { small: 12, large: 15, xlarge: 19 } },
      { name: 'Imported Anchovies', desc: 'Imported Anchovies', prices: { small: 12, large: 15, xlarge: 19 } },
      { name: 'Black Olives', desc: 'Sliced Black Olives', prices: { small: 12, large: 15, xlarge: 18 } },
      { name: 'Bacon', desc: 'Crispy Bacon', prices: { small: 12, large: 15, xlarge: 19 } },
      { name: 'Steak', desc: 'Sliced Steak', prices: { small: 12, large: 18, xlarge: 19 } },
    ],
    specialty: [
      { name: "George's Special", desc: 'Pepperoni, Sausage, Green Peppers, Onions & Mushrooms', prices: { small: 14, large: 15, xlarge: 18 }, hasPepperoniChoice: true },
      { name: 'Grilled Chicken', desc: 'Grilled Marinated Chicken Breast', prices: { small: 14, large: 15, xlarge: 18 } },
      { name: 'BBQ Chicken', desc: 'Grilled Chicken with BBQ Sauce', prices: { small: 14, large: 15, xlarge: 18 } },
      { name: 'Buffalo Chicken', desc: 'Spicy Buffalo Chicken with Bleu Cheese Drizzle', prices: { small: 14, large: 18, xlarge: 19 } },
      { name: 'Meat Lover', desc: 'Pepperoni, Sausage, Ham, Bacon & Ground Beef', prices: { small: 14, large: 18, xlarge: 19 }, hasPepperoniChoice: true },
    ],
    toppingPrice: 3,
  };

  const whitePizzaMenu = {
    items: [
      { name: 'Plain White', desc: 'Garlic & Olive Oil Base, Mozzarella (No Red Sauce)', prices: { small: 9, large: 12, xlarge: 15 } },
      { name: 'Spinach', desc: 'Fresh Spinach on Garlic Base', prices: { small: 12, large: 13, xlarge: 17 } },
      { name: 'Broccoli', desc: 'Fresh Broccoli on Garlic Base', prices: { small: 12, large: 15, xlarge: 19 } },
      { name: 'Vegetarian', desc: 'Broccoli, Green Peppers, Onions, Tomatoes & Mushrooms', prices: { small: 14, large: 18, xlarge: 19 } },
      { name: 'Ricotta & Mozzarella', desc: 'Creamy Ricotta & Mozzarella Blend', prices: { small: 11, large: 15, xlarge: 17 } },
      { name: 'Greek', desc: 'Feta, Mozzarella, Spinach, Tomatoes, Olives & Oregano', prices: { small: 14, large: 18, xlarge: 19 } },
      { name: 'Hawaiian', desc: 'Sweet Pineapple & Sliced Ham', prices: { small: 14, large: 18, xlarge: 19 } },
    ],
  };

  const steaksMenu = {
    beef: [
      { name: 'Steak', desc: 'Plain steak on a fresh roll', price: 9, hasSteakMods: true },
      { name: 'Cheese Steak', desc: 'With your choice of cheese', price: 10, hasSteakMods: true },
      { name: 'Cheese Steak Hoagie', desc: 'On a hoagie roll with lettuce, tomato, onion', price: 12, hasSteakMods: true },
      { name: 'Pizza Steak', desc: 'With pizza sauce & mozzarella', price: 12, hasSteakMods: true },
      { name: 'Pepperoni Cheese Steak', price: 12, hasSteakMods: true },
    ],
    chicken: [
      { name: 'Chicken Steak', desc: 'Plain chicken on a fresh roll', price: 10, hasSteakMods: true },
      { name: 'Chicken Cheese Steak', desc: 'With your choice of cheese', price: 12, hasSteakMods: true },
      { name: 'Grilled Chicken Cheese Steak', desc: 'Grilled marinated chicken breast', price: 13, hasSteakMods: true },
      { name: 'Buffalo Chicken Cheese Steak', desc: 'With buffalo sauce & bleu cheese', price: 13, hasSteakMods: true },
      { name: 'Chicken Cheese Steak Hoagie', desc: 'On a hoagie roll', price: 13, hasSteakMods: true },
    ],
    platters: [
      { name: 'Cheese Steak Platter', desc: 'With fries', price: 15, isPlatter: true },
      { name: 'Chicken Cheese Steak Platter', desc: 'With fries', price: 15, isPlatter: true },
      { name: 'Grilled Chicken Cheese Steak Platter', desc: 'With fries', price: 15, isPlatter: true },
    ],
    extras: { beef: 3, chicken: 1.5, cheese: 1 },
  };

  const hoagiesMenu = [
    { name: 'Regular Hoagie', price: 10, hasHoagieMods: true, ingredients: ['lettuce', 'tomato', 'onion', 'oil', 'mayo'] },
    { name: 'The Submarine', desc: 'American Cheese, Ham, Turkey', price: 10, hasHoagieMods: true, ingredients: ['american-cheese', 'ham', 'turkey', 'lettuce', 'tomato', 'onion', 'oil', 'mayo'] },
    { name: 'Italian', desc: 'Provolone, Ham, Genoa Salami & Cappicola', price: 10, hasHoagieMods: true, ingredients: ['provolone', 'ham', 'genoa-salami', 'cappicola', 'lettuce', 'tomato', 'onion', 'oil'] },
    { name: 'Turkey & Cheese', price: 10, hasHoagieMods: true, ingredients: ['turkey', 'american-cheese', 'lettuce', 'tomato', 'onion', 'oil', 'mayo'] },
    { name: 'Tuna & Cheese', price: 10, hasHoagieMods: true, ingredients: ['tuna', 'american-cheese', 'lettuce', 'tomato', 'onion', 'oil', 'mayo'] },
    { name: 'Ham & Cheese', price: 10, hasHoagieMods: true, ingredients: ['ham', 'american-cheese', 'lettuce', 'tomato', 'onion', 'oil', 'mayo'] },
    { name: 'Vegetable & American Cheese', desc: 'Lettuce, Tomato, Onions, Sweet Peppers, Green Peppers', price: 10, hasHoagieMods: true, ingredients: ['american-cheese', 'lettuce', 'tomato', 'onion', 'sweet-peppers', 'green-peppers', 'oil'] },
    { name: 'Mixed Cheese', desc: 'Provolone & American', price: 10, hasHoagieMods: true, ingredients: ['provolone', 'american-cheese', 'lettuce', 'tomato', 'onion', 'oil', 'mayo'] },
    { name: 'Flounder & Cheese', price: 12, hasHoagieMods: true, ingredients: ['flounder', 'american-cheese', 'lettuce', 'tomato', 'onion', 'oil', 'mayo'] },
    { name: 'BLT', desc: 'Bacon, Lettuce & Tomatoes', price: 10, hasHoagieMods: true, ingredients: ['bacon', 'lettuce', 'tomato', 'mayo'] },
  ];

  const hotSandwichesMenu = [
    { name: 'Meatball', desc: 'Toasted with Sauce & Melted Provolone on a Long Roll', price: 12, hasHotSandwichMods: true },
    { name: 'Italian Sausage', desc: 'Toasted with Green Peppers, Onions & Melted Provolone on a Long Roll', price: 12, hasHotSandwichMods: true },
    { name: 'Chicken Parmesan', desc: 'Toasted with Pizza Cheese, Melted Provolone & Homemade Sauce on a Long Roll', price: 12, hasHotSandwichMods: true },
  ];

  const sandwichesMenu = [
    { name: 'Grilled Cheese', desc: 'Choice of Rye, Wheat or White Bread', price: 5, hasGrilledCheeseBread: true },
    { name: 'Ham & Cheese', price: 7, hasSandwichBread: true, ingredients: ['ham', 'american-cheese', 'lettuce', 'tomato'] },
    { name: 'Turkey & Cheese', price: 7, hasSandwichBread: true, ingredients: ['turkey', 'american-cheese', 'lettuce', 'tomato'] },
    { name: 'Tuna & Cheese', price: 7, hasSandwichBread: true, ingredients: ['tuna', 'american-cheese', 'lettuce', 'tomato'] },
    { name: 'BLT', price: 7, hasSandwichBread: true, ingredients: ['bacon', 'lettuce', 'tomato', 'mayo'] },
    { name: 'Flounder', price: 12, hasSandwichBread: true, ingredients: ['flounder', 'lettuce', 'tomato'] },
  ];

  const clubsMenu = [
    { name: 'Turkey Club', desc: 'Crispy Bacon, Lettuce, Tomato & Mayo', price: 12, hasClubMods: true, ingredients: ['turkey', 'bacon', 'lettuce', 'tomato', 'mayo'] },
    { name: 'Ham & American Cheese Club', desc: 'Lettuce, Tomato & Mayo', price: 12, hasClubMods: true, ingredients: ['ham', 'american-cheese', 'lettuce', 'tomato', 'mayo'] },
    { name: 'Tuna Fish Salad Club', desc: 'Lettuce & Tomato Dressing', price: 12, hasClubMods: true, ingredients: ['tuna-salad', 'lettuce', 'tomato-dressing'] },
    { name: 'Grilled Chicken Club', price: 13, hasClubMods: true, ingredients: ['grilled-chicken', 'lettuce', 'tomato', 'mayo'] },
  ];

  const wingsMenu = {
    wings: [
      { name: '5 Chicken Wings (Whole Wings)', price: 10, hasChickenWingsMods: true },
      { name: '5 Chicken Wings Platter', desc: 'With fries, coleslaw & garlic bread', price: 15, hasChickenWingsMods: true, hasWingPlatterMods: true },
    ],
    buffalo: [
      { name: '10 Buffalo Wings', desc: 'Your Choice of 1 Mild, Hot, or BBQ Sauce & 1 Blue Cheese included', price: 12, hasBuffaloMods: true },
      { name: '10 Buffalo Wings Platter', desc: 'With fries, coleslaw & garlic bread', price: 15, hasBuffaloMods: true, hasWingPlatterMods: true },
      { name: '10 Wing Dings (Breaded)', price: 15, hasBuffaloMods: true },
      { name: '10 Wing Dings Platter', desc: 'With fries, coleslaw & garlic bread', price: 20, hasBuffaloMods: true, hasWingPlatterMods: true },
    ],
    nuggets: [
      { name: '10 Nuggets', desc: 'Honey Mustard, BBQ, or Ranch', price: 8, hasDipChoice: true },
      { name: '10 Nuggets Platter', desc: 'With fries, coleslaw, & garlic bread', price: 14, hasDipChoice: true, hasWingPlatterMods: true },
      { name: '20 Nuggets', price: 16, hasDipChoice: true },
      { name: '20 Nuggets Platter', desc: 'With fries, coleslaw & garlic bread', price: 18, hasDipChoice: true, hasWingPlatterMods: true },
    ],
    fingers: [
      { name: '5 Chicken Fingers', desc: 'Honey Mustard, BBQ, or Ranch', price: 8, hasDipChoice: true },
      { name: '5 Fingers Platter', desc: 'With fries, coleslaw & garlic bread', price: 14, hasDipChoice: true, hasWingPlatterMods: true },
    ],
  };

  const stromboliMenu = {
    items: [
      { name: 'Cheese & Sauce', prices: { small: 12, large: 14 }, hasStromboliMods: true },
      { name: 'Steak Cheese & Sauce', prices: { small: 14, large: 16 }, hasStromboliMods: true },
      { name: 'Ground Beef Cheese & Sauce', prices: { small: 14, large: 16 }, hasStromboliMods: true },
      { name: 'Sausage Cheese & Sauce', prices: { small: 14, large: 16 }, hasStromboliMods: true },
      { name: 'Italian Cappicola Genoa', prices: { small: 14, large: 16 }, hasStromboliMods: true },
      { name: 'Pepperoni Cheese & Sauce', prices: { small: 14, large: 16 }, hasStromboliMods: true },
      { name: 'Ham & Cheese', prices: { small: 14, large: 16 }, hasStromboliMods: true },
      { name: 'Special Steak', desc: 'Cheese, Mushrooms, Sauce, Fried Onions, Green Peppers & Pepperoni', prices: { small: 15, large: 17 }, hasStromboliMods: true },
      { name: 'Vegetarian', desc: 'Onions, Green Peppers, Cheese, Sauce & Mushrooms', prices: { small: 14, large: 16 }, hasStromboliMods: true },
      { name: 'Grilled Chicken Cheese & Sauce', prices: { small: 14, large: 16 }, hasStromboliMods: true },
      { name: 'Buffalo Chicken', prices: { small: 14, large: 16 }, hasStromboliMods: true },
    ],
    extraTopping: { small: 3, large: 4 },
  };

  const saladsMenu = [
    { 
      name: 'Garden Salad', 
      desc: 'Iceberg lettuce, tomatoes, onions, green peppers, egg, olives, cucumbers',
      prices: { small: 10, large: 12 },
      hasSaladMods: true,
      ingredients: ['iceberg-lettuce', 'tomatoes', 'onions', 'green-peppers', 'egg', 'olives', 'cucumbers'],
      defaultDressing: null
    },
    { 
      name: 'Grilled Chicken Caesar', 
      desc: 'Romaine lettuce, croutons, parmesan, grilled chicken, caesar dressing',
      prices: { small: 10, large: 12 },
      hasSaladMods: true,
      ingredients: ['romaine-lettuce', 'croutons', 'parmesan', 'grilled-chicken'],
      defaultDressing: 'caesar',
      isCaesar: true
    },
    { 
      name: 'Chef Salad', 
      desc: 'Ham, turkey, American cheese, iceberg lettuce, tomatoes, onions, green peppers, egg, olives, cucumbers',
      prices: { small: 10, large: 12 },
      hasSaladMods: true,
      ingredients: ['ham', 'turkey', 'american-cheese', 'iceberg-lettuce', 'tomatoes', 'onions', 'green-peppers', 'egg', 'olives', 'cucumbers'],
      defaultDressing: null
    },
    { 
      name: 'Chicken Tender Salad', 
      desc: 'Garden salad with generous chicken tenders on top',
      prices: { small: 10, large: 12 },
      hasSaladMods: true,
      ingredients: ['chicken-tenders', 'iceberg-lettuce', 'tomatoes', 'onions', 'green-peppers', 'egg', 'olives', 'cucumbers'],
      defaultDressing: null
    },
    { 
      name: 'Antipasto', 
      desc: 'Genoa salami, provolone, ham, pepperoni, olives on garden',
      prices: { small: 10, large: 12 },
      hasSaladMods: true,
      ingredients: ['genoa-salami', 'provolone', 'ham', 'pepperoni', 'olives', 'iceberg-lettuce', 'tomatoes', 'onions', 'green-peppers'],
      defaultDressing: null
    },
    { 
      name: 'Cheese Salad', 
      desc: 'American & provolone cheese on garden',
      prices: { small: 10, large: 12 },
      hasSaladMods: true,
      ingredients: ['american-cheese', 'provolone', 'iceberg-lettuce', 'tomatoes', 'onions', 'green-peppers', 'egg', 'olives', 'cucumbers'],
      defaultDressing: null
    },
    { 
      name: 'Grilled Chicken Salad', 
      desc: 'Hot grilled chicken over garden',
      prices: { small: 10, large: 12 },
      hasSaladMods: true,
      ingredients: ['grilled-chicken', 'iceberg-lettuce', 'tomatoes', 'onions', 'green-peppers', 'egg', 'olives', 'cucumbers'],
      defaultDressing: null
    },
    { 
      name: 'Tuna & Cheese Salad', 
      desc: 'Tuna salad with cheese on garden',
      prices: { small: 10, large: 12 },
      hasSaladMods: true,
      ingredients: ['tuna', 'american-cheese', 'iceberg-lettuce', 'tomatoes', 'onions', 'green-peppers', 'olives', 'cucumbers'],
      defaultDressing: null
    },
    { 
      name: 'Flounder Salad', 
      desc: 'Fried flounder on garden',
      prices: { small: 12, large: 14 },
      hasSaladMods: true,
      ingredients: ['flounder', 'iceberg-lettuce', 'tomatoes', 'onions', 'green-peppers', 'olives', 'cucumbers'],
      defaultDressing: null
    },
    { 
      name: 'Greek Salad', 
      desc: 'With feta cheese, olives, pepperoncini',
      prices: { small: 11, large: 13 },
      hasSaladMods: true,
      ingredients: ['feta-cheese', 'olives', 'pepperoncini', 'iceberg-lettuce', 'tomatoes', 'onions', 'cucumbers'],
      defaultDressing: null
    },
  ];

  const pastaMenu = [
    { name: 'Pasta with Tomato Sauce', desc: 'With Garlic Bread & Salad', price: 12, hasPastaChoice: true },
    { name: 'Pasta with Meatballs', desc: 'Fresh Handcrafted Meatballs', price: 15, hasPastaChoice: true },
    { name: 'Pasta with Italian Sausage', price: 15, hasPastaChoice: true },
    { name: 'Pasta with Chicken Breast', price: 15, hasPastaChoice: true },
  ];

  const seafoodMenu = [
    { name: 'Fried Scallops (10 Pcs)', price: 15, isPlatter: true },
    { name: 'Fried Flounder (6 oz.)', price: 15, isPlatter: true },
    { name: 'Fried Shrimp (5 Pcs)', price: 15, isPlatter: true },
    { name: 'Crab Cakes (2 Pcs)', price: 15, isPlatter: true },
    { name: 'Fish & Chips (4 Pcs)', price: 15, isPlatter: true },
    { name: 'Shrimp in the Basket', price: 15, isPlatter: true },
  ];

  const burgersMenu = [
    { name: 'Plain Burger', price: 6, hasBurgerMods: true },
    { name: 'Cheeseburger', price: 7, hasBurgerMods: true },
    { name: 'Bacon Cheeseburger', price: 8, hasBurgerMods: true },
    { name: 'Turkey Burger', price: 8, hasBurgerMods: true, isTurkey: true },
    { name: 'Pizza Burger', price: 8, hasBurgerMods: true },
    { name: 'California Burger Platter', desc: 'Burger with fries', price: 12, isCaliforniaPlatter: true },
    { name: 'Double Cheeseburger', price: 9, hasBurgerMods: true },
  ];

  const gyrosWrapsMenu = {
    gyros: [
      { name: 'Gyro', price: 10, hasGyroMods: true },
      { name: 'Gyro with Platter', desc: 'With fries', price: 13, hasGyroMods: true },
      { name: 'Grilled Chicken Gyro', price: 10, hasGyroMods: true },
      { name: 'Grilled Chicken Gyro with Platter', desc: 'With fries', price: 13, hasGyroMods: true },
    ],
    wraps: [
      { name: 'Italian Hoagie Wrap', desc: 'With Fries & Cole Slaw', price: 12, hasWrapMods: true, ingredients: ['provolone', 'ham', 'genoa-salami', 'cappicola', 'lettuce', 'tomato', 'onion', 'oil'] },
      { name: 'Turkey & Spinach Wrap', price: 12, hasWrapMods: true, ingredients: ['turkey', 'spinach', 'lettuce', 'tomato', 'onion'] },
      { name: 'Chicken Caesar Wrap', desc: 'Parmesan & Caesar Dressing', price: 12, hasWrapMods: true, ingredients: ['grilled-chicken', 'romaine', 'parmesan', 'caesar-dressing'] },
      { name: 'Tuna Wrap', desc: 'With Provolone', price: 12, hasWrapMods: true, ingredients: ['tuna', 'provolone', 'lettuce', 'tomato', 'onion'] },
      { name: 'Veggie Wrap', desc: 'With Provolone', price: 12, hasWrapMods: true, ingredients: ['provolone', 'lettuce', 'tomato', 'onion', 'green-peppers', 'sweet-peppers'] },
      { name: "George's Special Cheese Steak Wrap", desc: 'Onion, Green Peppers, Pepperoni, Mushrooms, Sauce & Provolone', price: 13, hasWrapMods: true, ingredients: ['steak', 'provolone', 'onion', 'green-peppers', 'pepperoni', 'mushrooms', 'sauce'] },
    ],
    quesadillas: [
      { name: 'Veggie Quesadilla', desc: 'Tomatoes, Mushrooms, Green Peppers, Fried Onions', price: 11, hasQuesadillaMods: true, ingredients: ['tomatoes', 'mushrooms', 'green-peppers', 'fried-onions', 'sour-cream'] },
      { name: 'Grilled Chicken Quesadilla', desc: 'With Green Peppers, Fried Onions', price: 13, hasQuesadillaMods: true, ingredients: ['grilled-chicken', 'green-peppers', 'fried-onions', 'sour-cream'] },
      { name: 'Ground Beef Quesadilla', desc: 'With Green Peppers, Fried Onions', price: 13, hasQuesadillaMods: true, ingredients: ['ground-beef', 'green-peppers', 'fried-onions', 'sour-cream'] },
    ],
  };

  const sidesMenu = [
    { name: 'French Fries', prices: { small: 4, large: 7 }, hasCondiments: true, hasSize: true },
    { name: 'Cheese Fries', prices: { small: 6, large: 8 }, hasCondiments: true, hasSize: true },
    { name: 'Pizza Fries', prices: { small: 7, large: 9 }, hasCondiments: true, hasSize: true },
    { name: 'Mozzarella Fries', desc: 'Fries topped with melted mozzarella', prices: { small: 7, large: 9 }, hasCondiments: true, hasSize: true },
    { name: 'Mega Fries', desc: 'Mozzarella, Cheese Whiz & Bacon', price: 9, hasCondiments: true },
    { name: 'Onion Rings (12)', price: 6, hasCondiments: true },
    { name: 'Mozzarella Sticks (6)', price: 7, hasDippingSauce: true },
    { name: 'Fried Broccoli & Cheese (8)', price: 8 },
    { name: 'Jalapeno Poppers (6)', price: 8, hasDippingSauce: true },
    { name: 'Fried Mini Tacos (12)', desc: 'Crispy beef tacos', price: 8 },
    { name: 'Garlic Knots (3)', price: 3, badge: 'NEW!', hasDippingSauce: true },
    { name: 'Plain Slice of Pizza', price: 3 },
    { name: 'Cole Slaw', price: 2 },
  ];

  const drinksMenu = [
    { name: 'Soda (20 oz.)', desc: 'Pepsi, 7up, Canada Dry, Arizona Tea, Mt Dew, Diet Pepsi, Sunkist, Root Beer', price: 2.50, has20ozChoice: true },
    { name: 'Soda (Can)', desc: "Day's Sodas", price: 1, hasCanChoice: true },
    { name: 'Soda (2 Liter)', desc: "Pepsi, Day's Ginger Ale, Grape, Orange", price: 4, has2LiterChoice: true },
    { name: 'Water (16 oz.)', price: 1 },
    { name: 'Hot Coffee (Small)', price: 2 },
    { name: 'Hot Coffee (Large)', price: 4 },
  ];

  const chipsMenu = [
    { name: "Herr's Chips (Small)", desc: 'BBQ, Classic, Sour Cream & Onion', price: 1, hasChipsChoice: true, isSmall: true },
    { name: "Herr's Chips (Large)", desc: 'BBQ, Classic, Sour Cream & Onion', price: 2.69, hasChipsChoice: true },
  ];

  const dessertsMenu = [
    { name: 'Cheesecake', desc: 'Pineapple, Cherry, or Strawberry', price: 5, hasCheesecakeChoice: true },
    { name: 'Strawberry Shortcake', price: 5 },
    { name: 'Carrot Cake', price: 5 },
    { name: 'Ice Cream Pint', desc: 'Chocolate, Vanilla, or Strawberry', price: 5.5, hasIceCreamChoice: true },
    { name: 'Milk Shake (16 oz.)', desc: 'Made with Bassetts Ice Cream • Chocolate, Vanilla, Strawberry, or Black & White', price: 5.5, hasMilkshakeChoice: true },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#F5F0E6', fontFamily: "'Georgia', serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Crimson+Text:wght@400;600&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        .checkered-top {
          height: 14px;
          background: repeating-linear-gradient(90deg, #228B22 0px, #228B22 14px, white 14px, white 28px);
        }
        .checkered-bottom {
          height: 14px;
          background: repeating-linear-gradient(90deg, white 0px, white 14px, #228B22 14px, #228B22 28px);
        }
        
        .red-banner {
          background: linear-gradient(180deg, #C41E3A 0%, #8B0000 100%);
          color: white;
          padding: 10px 16px;
          font-family: 'Oswald', sans-serif;
          font-weight: 700;
          font-size: 20px;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-align: center;
          border: 3px solid #8B0000;
          box-shadow: inset 0 1px 3px rgba(255,255,255,0.2);
        }
        
        .menu-item {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding: 8px 0;
          border-bottom: 1px dotted #999;
          transition: background 0.15s;
        }
        .menu-item:hover { background: rgba(196,30,58,0.06); }
        .menu-item:last-child { border-bottom: none; }
        
        .item-name { font-weight: 600; color: #1a1a1a; }
        .item-desc { font-size: 12px; color: #666; font-style: italic; margin-top: 2px; }
        .item-price { font-weight: 700; color: #C41E3A; font-size: 16px; white-space: nowrap; }
        
        .yellow-section {
          background: #FFF8DC;
          border: 3px solid #DAA520;
          padding: 16px;
        }
        .yellow-section.disabled {
          background: #E5E5E5;
          border-color: #999;
          opacity: 0.55;
          pointer-events: none;
        }
        
        .btn-red {
          background: linear-gradient(180deg, #C41E3A 0%, #8B0000 100%);
          color: white;
          border: 2px solid #8B0000;
          padding: 10px 20px;
          font-family: 'Oswald', sans-serif;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          text-transform: uppercase;
          transition: all 0.2s;
        }
        .btn-red:hover { background: linear-gradient(180deg, #D42E4A 0%, #9B1010 100%); }
        .btn-red:disabled { background: #999; border-color: #777; cursor: not-allowed; }
        
        .btn-outline {
          background: white;
          color: #C41E3A;
          border: 2px solid #C41E3A;
          padding: 8px 16px;
          font-family: 'Oswald', sans-serif;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          text-transform: uppercase;
        }
        .btn-outline:hover { background: #FFF5F5; }
        
        .category-card {
          background: white;
          border: 2px solid #ddd;
          padding: 16px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        .category-card:hover {
          border-color: #C41E3A;
          box-shadow: 0 4px 12px rgba(196,30,58,0.15);
          transform: translateY(-2px);
        }
        
        .green-stripe {
          width: 6px;
          background: #228B22;
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          pointer-events: none;
        }
        
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 16px;
        }
        .modal-content {
          background: #F5F0E6;
          max-width: 480px;
          width: 100%;
          max-height: 85vh;
          overflow-y: auto;
        }
        
        .size-btn {
          flex: 1;
          padding: 12px 8px;
          border: 2px solid #ddd;
          background: white;
          cursor: pointer;
          font-family: 'Oswald', sans-serif;
          font-weight: 600;
          transition: all 0.15s;
        }
        .size-btn:hover { border-color: #C41E3A; }
        .size-btn.selected {
          background: #C41E3A;
          color: white;
          border-color: #8B0000;
        }
        
        .checkbox-row {
          display: flex;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px dotted #ccc;
          cursor: pointer;
        }
        .checkbox-row:hover { background: rgba(196,30,58,0.04); }
        .checkbox-row input { margin-right: 10px; width: 16px; height: 16px; accent-color: #C41E3A; }
        
        .radio-row {
          display: flex;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px dotted #ccc;
          cursor: pointer;
        }
        .radio-row input { margin-right: 10px; width: 16px; height: 16px; accent-color: #C41E3A; }
        
        .menu-section {
          background: white;
          border: 2px solid #ddd;
          margin-bottom: 20px;
          position: relative;
        }
        .menu-section-content { padding: 16px 16px 16px 22px; }
        
        .badge-new {
          background: #228B22;
          color: white;
          font-size: 10px;
          padding: 2px 6px;
          font-weight: 700;
          margin-left: 8px;
          font-family: 'Oswald', sans-serif;
        }
        
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
        .pulse { animation: pulse 2s infinite; }
        
        @keyframes slideIn {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideOut {
          from { transform: translateY(0); opacity: 1; }
          to { transform: translateY(-100%); opacity: 0; }
        }
        .cart-toast {
          animation: slideIn 0.3s ease-out;
        }
        .cart-toast.hiding {
          animation: slideOut 0.3s ease-in forwards;
        }
        
        .add-btn {
          background: #228B22;
          color: white;
          border: none;
          padding: 6px 12px;
          font-family: 'Oswald', sans-serif;
          font-weight: 600;
          font-size: 12px;
          cursor: pointer;
          text-transform: uppercase;
          transition: all 0.15s;
          white-space: nowrap;
        }
        .add-btn:hover {
          background: #1a6b1a;
          transform: scale(1.05);
        }
      `}</style>

      {/* ============ HEADER ============ */}
      <header style={{ background: 'white', borderBottom: '2px solid #228B22', position: 'relative', zIndex: 100 }}>
        <div className="checkered-top" />
        <div style={{
          maxWidth: 1000,
          margin: '0 auto',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          {/* Logo */}
          <div 
            style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
            onClick={() => { setCurrentView('home'); setSelectedCategory(null); }}
          >
            <img 
              src="logo-header.png" 
              alt="George's Pizza" 
              style={{ height: 80, width: 'auto', maxWidth: 200 }} 
              onError={(e) => { 
                e.target.style.display = 'none'; 
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div style={{ display: 'none', fontFamily: "'Oswald', sans-serif", fontSize: 24, fontWeight: 700, color: '#C41E3A' }}>
              GEORGE'S PIZZA
            </div>
          </div>

          {/* Order Type Toggle */}
          <div style={{ display: 'flex', border: '2px solid #C41E3A', overflow: 'hidden' }}>
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOrderType('pickup'); }}
              style={{
                padding: '8px 16px',
                border: 'none',
                background: orderType === 'pickup' ? '#C41E3A' : 'white',
                color: orderType === 'pickup' ? 'white' : '#C41E3A',
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: 13,
              }}
            >
              PICKUP ~15min
            </button>
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOrderType('delivery'); }}
              style={{
                padding: '8px 16px',
                border: 'none',
                borderLeft: '2px solid #C41E3A',
                background: orderType === 'delivery' ? '#C41E3A' : 'white',
                color: orderType === 'delivery' ? 'white' : '#C41E3A',
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: 13,
              }}
            >
              DELIVERY 35-45min
            </button>
          </div>

          {/* Cart */}
          <button type="button"
            className="btn-red"
            onClick={() => setCurrentView('checkout')}
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          >
            🛒 Cart ({cart.length}) ${cartTotal.toFixed(2)}
          </button>
        </div>
        <div className="checkered-bottom" />
      </header>

      {/* Cart Added Notification Toast */}
      {cartNotification && (
        <div 
          className="cart-toast"
          style={{
            position: 'fixed',
            top: 80,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'linear-gradient(180deg, #228B22 0%, #1a6b1a 100%)',
            color: 'white',
            padding: '12px 20px',
            textAlign: 'center',
            zIndex: 999,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            borderRadius: 8,
          }}
        >
          <span style={{ fontSize: 20 }}>✔</span>
          <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: 16 }}>
            {cartNotification} added to cart!
          </span>
          <button type="button"
            onClick={() => setCurrentView('checkout')}
            style={{
              background: 'white',
              color: '#228B22',
              border: 'none',
              padding: '6px 14px',
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 600,
              fontSize: 13,
              cursor: 'pointer',
              marginLeft: 10,
            }}
          >
            VIEW CART →
          </button>
        </div>
      )}

      {/* ============ MAIN ============ */}
      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '16px' }}>
        
        {/* HOME VIEW */}
        {currentView === 'home' && !selectedCategory && (
          <>
            <div style={{ textAlign: 'center', padding: '24px 16px' }}>
              <h1 style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: 32,
                fontWeight: 700,
                color: '#1a1a1a',
                marginBottom: 4,
              }}>
                What are you hungry for?
              </h1>
              <p style={{ color: '#666', fontSize: 14 }}>
                <span style={{ 
                  color: storeStatus.isOpen ? '#228B22' : '#C41E3A',
                  fontWeight: 600 
                }}>
                  {storeStatus.isOpen ? '✅' : '⏰'} {storeStatus.message}
                </span>
                {' • '}
                <span>📞 215-236-5288</span>
              </p>
            </div>

            {/* Category Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: 10,
              marginBottom: 24,
            }}>
              {categories.map(cat => (
                <div
                  key={cat.id}
                  className="category-card"
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <div style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: 15,
                    fontWeight: 700,
                    color: '#C41E3A',
                    marginBottom: 2,
                  }}>
                    {cat.name}
                  </div>
                  <div style={{ fontSize: 11, color: '#666' }}>{cat.desc}</div>
                </div>
              ))}
            </div>

            {/* Lunch Specials */}
            <div className={`yellow-section${!lunchAvailable ? ' disabled' : ''}`} style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 20, fontWeight: 700, color: '#8B4513' }}>
                    $10 LUNCH SPECIALS
                  </div>
                  <div style={{ fontSize: 12, color: '#666' }}>Mon-Fri 11am-2pm • No Substitutions</div>
                </div>
                {lunchAvailable ? (
                  <span className="pulse" style={{ background: '#228B22', color: 'white', padding: '4px 10px', fontFamily: "'Oswald', sans-serif", fontSize: 11 }}>
                    â— AVAILABLE NOW
                  </span>
                ) : (
                  <span style={{ background: '#666', color: 'white', padding: '4px 10px', fontFamily: "'Oswald', sans-serif", fontSize: 11 }}>
                    M-F 11AM-2PM
                  </span>
                )}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 6 }}>
                {lunchSpecials.map(s => (
                  <div
                    key={s.num}
                    className="menu-item"
                    onClick={() => lunchAvailable && setLunchCustomizing(s)}
                    style={{ background: 'white', padding: '8px 10px', border: '1px solid #ddd', cursor: 'pointer' }}
                  >
                    <div>
                      <span style={{ background: '#C41E3A', color: 'white', padding: '1px 5px', fontSize: 10, marginRight: 6, fontWeight: 700 }}>#{s.num}</span>
                      <span className="item-name" style={{ fontSize: 13 }}>{s.name}</span>
                    </div>
                    <span className="item-price">${s.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Family Deals */}
            <div className="red-banner">Everyday Special</div>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0' }}>
              {familyDeals.map(deal => (
                <div
                  key={deal.id}
                  style={{ background: 'white', border: '3px solid #C41E3A', padding: 16, position: 'relative', cursor: 'pointer', maxWidth: 320, width: '100%' }}
                  onClick={() => deal.hasTwoLargePizzaMods ? setFamilyDealCustomizing(deal) : addToCart({ name: deal.name, price: deal.price, mods: [] })}
                >
                  <div style={{ position: 'absolute', top: -1, right: -1, background: '#228B22', color: 'white', padding: '3px 8px', fontSize: 10, fontFamily: "'Oswald', sans-serif", fontWeight: 600 }}>
                    {deal.badge}
                  </div>
                  <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 28, fontWeight: 700, color: '#C41E3A', textAlign: 'center' }}>${deal.price}</div>
                  <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 16, fontWeight: 600, color: '#1a1a1a', marginBottom: 4, textAlign: 'center' }}>{deal.name}</div>
                  <div style={{ fontSize: 12, color: '#666', textAlign: 'center' }}>{deal.desc}</div>
                  {deal.hasTwoLargePizzaMods && <div style={{ fontSize: 11, color: '#228B22', marginTop: 4, textAlign: 'center' }}>+ Add toppings</div>}
                </div>
              ))}
            </div>

            {/* Info Bar */}
            <div style={{ background: '#1a1a1a', color: 'white', padding: 20, marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, textAlign: 'center', fontSize: 13 }}>
              <div><div style={{ opacity: 0.6, fontSize: 11, marginBottom: 4 }}>LOCATION</div>201 W. Girard Ave<br/>Philadelphia, PA</div>
              <div><div style={{ opacity: 0.6, fontSize: 11, marginBottom: 4 }}>HOURS</div>Mon-Thu: 11am-10pm<br/>Fri-Sat: 11am-11pm<br/>Sun: 2pm-10pm</div>
              <div><div style={{ opacity: 0.6, fontSize: 11, marginBottom: 4 }}>DELIVERY</div>$15 min • $3 fee<br/><span style={{ color: '#90EE90' }}>Free 2L w/ $45+</span></div>
            </div>
          </>
        )}

        {/* CATEGORY VIEWS */}
        {selectedCategory && currentView === 'home' && (
          <CategoryView
            categoryId={selectedCategory}
            onBack={() => setSelectedCategory(null)}
            onAddToCart={addToCart}
            pizzaMenu={pizzaMenu}
            whitePizzaMenu={whitePizzaMenu}
            steaksMenu={steaksMenu}
            hoagiesMenu={hoagiesMenu}
            hotSandwichesMenu={hotSandwichesMenu}
            sandwichesMenu={sandwichesMenu}
            clubsMenu={clubsMenu}
            wingsMenu={wingsMenu}
            stromboliMenu={stromboliMenu}
            saladsMenu={saladsMenu}
            pastaMenu={pastaMenu}
            seafoodMenu={seafoodMenu}
            burgersMenu={burgersMenu}
            gyrosWrapsMenu={gyrosWrapsMenu}
            sidesMenu={sidesMenu}
            drinksMenu={drinksMenu}
            chipsMenu={chipsMenu}
            dessertsMenu={dessertsMenu}
          />
        )}

        {/* CHECKOUT */}
        {currentView === 'checkout' && (
          <CheckoutView
            cart={cart}
            onRemove={removeFromCart}
            onBack={() => setCurrentView('home')}
            onNavigateToCategory={(cat) => { setSelectedCategory(cat); setCurrentView('home'); }}
            orderType={orderType}
            setOrderType={setOrderType}
            subtotal={cartTotal}
            customerName={customerName}
            setCustomerName={setCustomerName}
            email={customerEmail}
            setEmail={setCustomerEmail}
            phone={customerPhone}
            setPhone={setCustomerPhone}
            deliveryAddress={deliveryAddress}
            setDeliveryAddress={setDeliveryAddress}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            couponApplied={couponApplied}
            setCouponApplied={setCouponApplied}
            emailConsent={emailConsent}
            setEmailConsent={setEmailConsent}
            deliveryZones={DELIVERY_ZONES}
            deliveryMinimum={DELIVERY_MINIMUM}
            deliveryFee={DELIVERY_FEE}
            taxRate={TAX_RATE}
            specialInstructions={specialInstructions}
            setSpecialInstructions={setSpecialInstructions}
            driverTip={driverTip}
            setDriverTip={setDriverTip}
            storeStatus={storeStatus}
          />
        )}
      </main>

      {/* Lunch Special Customizer Modal */}
      {lunchCustomizing && (
        <LunchSpecialCustomizer
          item={lunchCustomizing}
          onClose={() => setLunchCustomizing(null)}
          onAdd={(item) => { addToCart(item); setLunchCustomizing(null); }}
        />
      )}

      {/* Two Large Pizza Customizer Modal */}
      {familyDealCustomizing && (
        <TwoLargePizzaCustomizer
          item={familyDealCustomizing}
          onClose={() => setFamilyDealCustomizing(null)}
          onAdd={(item) => { addToCart(item); setFamilyDealCustomizing(null); }}
        />
      )}

      {/* FOOTER */}
      <footer style={{ background: '#C41E3A', color: 'white', padding: 16, textAlign: 'center', marginTop: 30 }}>
        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 16, fontWeight: 700 }}>George's Pizza</div>
        <div style={{ fontSize: 12, opacity: 0.9 }}>Serving Philadelphia since 1984</div>
      </footer>
    </div>
  );
}

// ============ CATEGORY VIEW COMPONENT ============
function CategoryView({ categoryId, onBack, onAddToCart, pizzaMenu, whitePizzaMenu, steaksMenu, hoagiesMenu, hotSandwichesMenu, sandwichesMenu, clubsMenu, wingsMenu, stromboliMenu, saladsMenu, pastaMenu, seafoodMenu, burgersMenu, gyrosWrapsMenu, sidesMenu, drinksMenu, chipsMenu, dessertsMenu }) {
  const [customizing, setCustomizing] = useState(null);
  const [genericCustomizing, setGenericCustomizing] = useState(null);

  const renderSimpleMenu = (title, items, note, customizeHandler) => (
    <div className="menu-section">
      <div className="green-stripe" />
      <div className="red-banner">{title}</div>
      <div className="menu-section-content">
        {note && <div style={{ fontSize: 12, color: '#666', fontStyle: 'italic', marginBottom: 12 }}>{note}</div>}
        {items.map((item, i) => {
          const hasAnyModifier = item.hasBurgerMods || item.isCaliforniaPlatter || item.hasChickenWingsMods || item.hasBuffaloMods || item.hasDipChoice || 
            item.hasHoagieMods || item.hasBreadChoice || item.hasPastaChoice || 
            item.hasDressing || item.hasGyroMods || item.has20ozChoice || item.hasCanChoice || 
            item.has2LiterChoice || item.hasCheesecakeChoice || item.hasChipsChoice || item.hasIceCreamChoice || item.hasMilkshakeChoice || item.hasQuesadillaMods ||
            item.hasGrilledCheeseBread || item.hasSandwichBread || item.hasHotSandwichMods || item.hasWrapMods || item.hasWingPlatterMods;
          
          return (
            <div key={i} className="menu-item" style={{ alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <span className="item-name">{item.name}</span>
                {item.badge && <span className="badge-new">{item.badge}</span>}
                {item.desc && <div className="item-desc">{item.desc}</div>}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span className="item-price">${item.price?.toFixed(2) || 'TBD'}</span>
                <button type="button"
                  className="add-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (item.isCaliforniaPlatter) {
                      setCustomizing(item);
                    } else if (hasAnyModifier) {
                      setGenericCustomizing(item);
                    } else {
                      onAddToCart({ name: item.name, price: item.price, mods: [] });
                    }
                  }}
                >
                  + ADD
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderPizzaMenu = (title, items, type) => (
    <div className="menu-section">
      <div className="green-stripe" />
      <div className="red-banner">{title}</div>
      <div className="menu-section-content">
        <div style={{ fontSize: 12, color: '#666', fontStyle: 'italic', marginBottom: 12 }}>
          Small 10" • Large 14" • X-Large 16" | Additional Topping $3
        </div>
        {items.map((item, i) => (
          <div key={i} className="menu-item" style={{ alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <span className="item-name">{item.name}</span>
              {item.desc && <div className="item-desc">{item.desc}</div>}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className="item-price">${item.prices.small} - ${item.prices.xlarge}</span>
              <button type="button"
                className="add-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setCustomizing({ ...item, type });
                }}
              >
                + ADD
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <button type="button" onClick={onBack} className="btn-outline" style={{ marginBottom: 16 }}>← Back to Menu</button>

      {categoryId === 'pizza' && (
        <>
          {/* Half & Half Pizza Builder */}
          <div className="menu-section" style={{ marginBottom: 20 }}>
            <div className="green-stripe" />
            <div className="red-banner">🍕 Build a Half & Half Pizza</div>
            <div className="menu-section-content">
              <div style={{ fontSize: 13, color: '#666', marginBottom: 12 }}>
                Want different toppings on each half? Build your perfect combination! Large & X-Large only.
              </div>
              <div 
                className="menu-item" 
                style={{ alignItems: 'center', background: '#FFF8DC', padding: 12, border: '2px dashed #DAA520', cursor: 'pointer' }}
              >
                <div style={{ flex: 1 }}>
                  <span className="item-name">Half & Half Pizza</span>
                  <div className="item-desc">Large 14" or X-Large 16" • Priced by most expensive half</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <button type="button"
                    className="add-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCustomizing({ isHalfHalf: true, name: 'Half & Half Pizza' });
                    }}
                  >
                    + BUILD
                  </button>
                </div>
              </div>
            </div>
          </div>
          {renderPizzaMenu("George's Pizza", pizzaMenu.classic, 'red')}
          {renderPizzaMenu('Specialty Pizzas', pizzaMenu.specialty, 'red')}
          {renderPizzaMenu('White Pizza (Garlic Base, No Red Sauce)', whitePizzaMenu.items, 'white')}
        </>
      )}

      {categoryId === 'steaks' && (
        <>
          <div className="menu-section">
            <div className="green-stripe" />
            <div className="red-banner">Beef & Chicken Steaks</div>
            <div className="menu-section-content">
              <div style={{ fontSize: 12, color: '#666', fontStyle: 'italic', marginBottom: 12 }}>
                We Use Freshly Sliced Meat (Not Frozen) on a Fresh Roll
              </div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, color: '#666', marginBottom: 8, borderBottom: '2px solid #C41E3A', paddingBottom: 4 }}>BEEF STEAKS</div>
              {steaksMenu.beef.map((item, i) => (
                <div key={i} className="menu-item" style={{ alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <span className="item-name">{item.name}</span>
                    {item.desc && <div className="item-desc">{item.desc}</div>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span className="item-price">${item.price}</span>
                    <button type="button"
                      className="add-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (item.hasSteakMods) {
                          setCustomizing({ ...item, category: 'beef' });
                        } else {
                          onAddToCart({ name: item.name, price: item.price, mods: [] });
                        }
                      }}
                    >
                      + ADD
                    </button>
                  </div>
                </div>
              ))}
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, color: '#666', marginTop: 16, marginBottom: 8, borderBottom: '2px solid #C41E3A', paddingBottom: 4 }}>CHICKEN STEAKS</div>
              {steaksMenu.chicken.map((item, i) => (
                <div key={i} className="menu-item" style={{ alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <span className="item-name">{item.name}</span>
                    {item.desc && <div className="item-desc">{item.desc}</div>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span className="item-price">${item.price}</span>
                    <button type="button"
                      className="add-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (item.hasSteakMods) {
                          setCustomizing({ ...item, category: 'chicken' });
                        } else {
                          onAddToCart({ name: item.name, price: item.price, mods: [] });
                        }
                      }}
                    >
                      + ADD
                    </button>
                  </div>
                </div>
              ))}
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, color: '#666', marginTop: 16, marginBottom: 8, borderBottom: '2px solid #C41E3A', paddingBottom: 4 }}>PLATTERS (with Fries)</div>
              {steaksMenu.platters.map((item, i) => (
                <div key={i} className="menu-item" style={{ alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <span className="item-name">{item.name}</span>
                    {item.desc && <div className="item-desc">{item.desc}</div>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span className="item-price">${item.price}</span>
                    <button type="button"
                      className="add-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCustomizing({ ...item, isPlatter: true });
                      }}
                    >
                      + ADD
                    </button>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 12, padding: 10, background: '#FFF8DC', border: '1px solid #DAA520', fontSize: 12 }}>
                <strong>Extras:</strong> Extra Beef +$3 • Extra Chicken +$1.50 • Extra Cheese +$1
              </div>
            </div>
          </div>
        </>
      )}

      {categoryId === 'hoagies' && (
        <>
          {renderSimpleMenu('Hoagies & Grinders', hoagiesMenu, 'Our Hoagies Travel! Fresh for 24 Hours. Prepared with the Finest Deli Meats & Cheeses. | Extra Meat +$3 • Extra Cheese +$1.50')}
          {renderSimpleMenu('Hot Sandwiches', hotSandwichesMenu, 'Served on a Long Roll')}
        </>
      )}

      {categoryId === 'sandwiches' && (
        <>
          {renderSimpleMenu('Sandwiches', sandwichesMenu, 'Served with Lettuce & Tomato. Choice of Kaiser Roll, Rye, Wheat or White Bread.')}
          <ClubsMenu items={clubsMenu} onAddToCart={onAddToCart} />
        </>
      )}

      {categoryId === 'wings' && (
        <>
          {renderSimpleMenu('Chicken Wings', wingsMenu.wings)}
          {renderSimpleMenu('Buffalo Wings', wingsMenu.buffalo, 'Your Choice: Mild, Hot, or BBQ')}
          {renderSimpleMenu('Chicken Nuggets', wingsMenu.nuggets, 'Your Choice: Honey Mustard, BBQ, or Ranch')}
          {renderSimpleMenu('Chicken Fingers', wingsMenu.fingers, 'Your Choice: Honey Mustard, BBQ, or Ranch')}
        </>
      )}

      {categoryId === 'stromboli' && (
        <StromboliMenu stromboliMenu={stromboliMenu} onAddToCart={onAddToCart} />
      )}

      {categoryId === 'salads' && (
        <SaladsMenu items={saladsMenu} onAddToCart={onAddToCart} />
      )}

      {categoryId === 'pasta-seafood' && (
        <>
          {renderSimpleMenu('Pasta', pastaMenu, 'Served with Garlic Bread & Fresh Tossed Salad')}
          <SeafoodMenu items={seafoodMenu} onAddToCart={onAddToCart} />
        </>
      )}

      {categoryId === 'burgers' && renderSimpleMenu('Hamburgers', burgersMenu, 'Lettuce & Tomato +$1 • Extra Cheese +$1')}

      {categoryId === 'gyros' && (
        <>
          {renderSimpleMenu('Greek Specialty Gyros', gyrosWrapsMenu.gyros, 'Served with Lettuce, Tomato, Onion & Tzatziki Sauce')}
          {renderSimpleMenu('Wraps', gyrosWrapsMenu.wraps, 'Flour Tortilla • Served with Lettuce, Tomato, Onions, French Fries & Cole Slaw')}
          {renderSimpleMenu('Quesadillas', gyrosWrapsMenu.quesadillas, 'All Quesadillas Come with Green Peppers, Fried Onions & Side of Sour Cream')}
        </>
      )}

      {categoryId === 'sides' && (
        <SidesMenu 
          items={sidesMenu} 
          onAddToCart={onAddToCart}
        />
      )}

      {categoryId === 'drinks' && (
        <>
          {renderSimpleMenu('Drinks', drinksMenu)}
          {renderSimpleMenu("Herr's Chips", chipsMenu)}
          {renderSimpleMenu('Desserts & Ice Cream', dessertsMenu)}
        </>
      )}

      {/* Pizza Size Customizer Modal */}
      {customizing && customizing.prices && (
        <PizzaCustomizer
          item={customizing}
          onClose={() => setCustomizing(null)}
          onAdd={(item) => { onAddToCart(item); setCustomizing(null); }}
        />
      )}

      {/* Half & Half Pizza Builder Modal */}
      {customizing && customizing.isHalfHalf && (
        <HalfHalfPizzaCustomizer
          pizzaMenu={pizzaMenu}
          whitePizzaMenu={whitePizzaMenu}
          onClose={() => setCustomizing(null)}
          onAdd={(item) => { onAddToCart(item); setCustomizing(null); }}
        />
      )}

      {/* Steak Customizer Modal */}
      {customizing && customizing.hasSteakMods && (
        <SteakCustomizer
          item={customizing}
          onClose={() => setCustomizing(null)}
          onAdd={(item) => { onAddToCart(item); setCustomizing(null); }}
        />
      )}

      {/* Steak Platter Customizer Modal */}
      {customizing && customizing.isPlatter && !customizing.hasSteakMods && (
        <SteakPlatterCustomizer
          item={customizing}
          onClose={() => setCustomizing(null)}
          onAdd={(item) => { onAddToCart(item); setCustomizing(null); }}
        />
      )}

      {/* California Burger Platter Customizer Modal */}
      {customizing && customizing.isCaliforniaPlatter && (
        <CaliforniaBurgerCustomizer
          item={customizing}
          onClose={() => setCustomizing(null)}
          onAdd={(item) => { onAddToCart(item); setCustomizing(null); }}
        />
      )}

      {/* Generic Customizer Modal */}
      {genericCustomizing && (
        <GenericCustomizer
          item={genericCustomizing}
          onClose={() => setGenericCustomizing(null)}
          onAdd={(item) => { onAddToCart(item); setGenericCustomizing(null); }}
        />
      )}
    </div>
  );
}

// ============ GENERIC CUSTOMIZER FOR VARIOUS ITEMS ============
function GenericCustomizer({ item, onClose, onAdd }) {
  const [selections, setSelections] = useState({});
  
  // Initialize extras - for quesadillas, start with all ingredients checked
  const getInitialExtras = () => {
    if (item.hasQuesadillaMods && item.ingredients) {
      return [...item.ingredients]; // Pre-check all ingredients
    }
    return [];
  };
  const [extras, setExtras] = useState(getInitialExtras);
  
  // For hoagies/sandwiches/wraps with ingredients - track what's included
  const [includedIngredients, setIncludedIngredients] = useState(() => {
    if ((item.hasHoagieMods || item.hasSandwichBread || item.hasWrapMods) && item.ingredients) {
      return [...item.ingredients];
    }
    return [];
  });

  // For platter fries options (wings, nuggets, fingers platters)
  const [platterFriesOptions, setPlatterFriesOptions] = useState([]);
  const platterFriesOpts = [
    { id: 'fries-salt', name: 'Salt', price: 0 },
    { id: 'fries-pepper', name: 'Pepper', price: 0 },
    { id: 'fries-ketchup', name: 'Ketchup', price: 0 },
    { id: 'cheese-whiz', name: 'Cheese Whiz', price: 2 },
  ];
  const togglePlatterFries = (id) => {
    setPlatterFriesOptions(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  // Define options based on item type
  const getOptions = () => {
    if (item.hasBurgerMods) { // Burgers
      const extraPattyPrice = item.isTurkey ? 3 : 2;
      return {
        title: 'Customize Your Burger',
        required: [],
        optional: [
          { id: 'lettuce-tomato', name: 'Lettuce & Tomato', price: 1 },
          { id: 'extra-cheese', name: 'Extra Cheese', price: 1 },
          { id: 'extra-patty', name: 'Extra Burger Patty', price: extraPattyPrice },
          { id: 'grilled-onions', name: 'Grilled Onions', price: 0 },
          { id: 'pickles', name: 'Pickles', price: 0 },
          { id: 'raw-onions', name: 'Raw Onions', price: 0 },
          { id: 'salt', name: 'Salt', price: 0 },
          { id: 'pepper', name: 'Pepper', price: 0 },
          { id: 'mayo', name: 'Mayo', price: 0 },
          { id: 'ketchup', name: 'Ketchup', price: 0 },
          { id: 'mustard', name: 'Mustard', price: 0 },
        ],
      };
    }
    if (item.hasChickenWingsMods) { // Chicken Wings (whole wings) - different from buffalo
      return {
        title: 'Customize Your Chicken Wings',
        required: [],
        optional: [
          { id: 'salt', name: 'Salt', price: 0 },
          { id: 'pepper', name: 'Pepper', price: 0 },
          { id: 'ketchup', name: 'Ketchup', price: 0 },
          { id: 'hot-sauce-side', name: 'Hot Sauce on the Side', price: 0 },
          { id: 'bleu-cheese', name: 'Bleu Cheese', price: 1 },
          { id: 'ranch', name: 'Ranch', price: 1 },
        ],
        hasPlatterFries: item.hasWingPlatterMods,
      };
    }
    if (item.hasBuffaloMods) { // Buffalo Wings / Wing Dings
      return {
        title: 'Customize Your Buffalo Wings',
        required: [
          { id: 'sauce', name: 'Sauce', options: ['Mild', 'Hot', 'BBQ', 'Dry - No Sauce'] }
        ],
        optional: [
          { id: 'sauce-on-side', name: 'Sauce on the Side', price: 0 },
          { id: 'extra-sauce', name: 'Extra Sauce', price: 0.75 },
          { id: 'extra-bleu-cheese', name: 'Extra Bleu Cheese', price: 1 },
          { id: 'ranch', name: 'Ranch', price: 1 },
        ],
        hasPlatterFries: item.hasWingPlatterMods,
      };
    }
    if (item.hasDipChoice) { // Nuggets/Fingers
      return {
        title: 'Choose Your Dipping Sauce',
        required: [
          { id: 'dip', name: 'Dipping Sauce', options: ['Honey Mustard', 'BBQ', 'Ranch', 'No Sauce'] }
        ],
        optional: [],
        hasPlatterFries: item.hasWingPlatterMods,
      };
    }
    if (item.hasHoagieMods) { // Hoagies with ingredients
      const hoagieIngredientNames = {
        'lettuce': 'Lettuce', 'tomato': 'Tomato', 'onion': 'Onion', 'oil': 'Oil',
        'american-cheese': 'American Cheese', 'provolone': 'Provolone', 'ham': 'Ham', 'turkey': 'Turkey',
        'genoa-salami': 'Genoa Salami', 'cappicola': 'Cappicola', 'tuna': 'Tuna', 'bacon': 'Bacon',
        'sweet-peppers': 'Sweet Peppers', 'green-peppers': 'Green Peppers', 'flounder': 'Flounder', 'mayo': 'Mayo'
      };
      return {
        title: 'Customize Your Hoagie',
        required: [],
        optional: [
          { id: 'salt', name: 'Salt', price: 0 },
          { id: 'pepper', name: 'Pepper', price: 0 },
          { id: 'olive-oil', name: 'Olive Oil', price: 0 },
          { id: 'hot-peppers', name: 'Hot Peppers', price: 0 },
          { id: 'oregano', name: 'Oregano', price: 0 },
          { id: 'extra-meat', name: 'Extra Meat', price: 3 },
          { id: 'extra-cheese', name: 'Extra Cheese', price: 1.5 },
        ],
        hoagieIngredients: (item.ingredients || []).map(ing => ({
          id: ing,
          name: hoagieIngredientNames[ing] || ing,
        })),
        isHoagie: true,
      };
    }
    if (item.hasGrilledCheeseBread) { // Grilled cheese - bread only
      return {
        title: 'Choose Your Bread',
        required: [
          { id: 'bread', name: 'Bread', options: ['Rye', 'Wheat', 'White'] }
        ],
        optional: [],
      };
    }
    if (item.hasSandwichBread) { // Other sandwiches with more bread options
      const sandwichIngredientNames = {
        'lettuce': 'Lettuce', 'tomato': 'Tomato', 'ham': 'Ham', 'turkey': 'Turkey',
        'american-cheese': 'American Cheese', 'tuna': 'Tuna', 'bacon': 'Bacon', 'mayo': 'Mayo', 'flounder': 'Flounder'
      };
      return {
        title: 'Customize Your Sandwich',
        required: [
          { id: 'bread', name: 'Bread', options: ['Kaiser Roll', 'Rye', 'Wheat', 'White'] }
        ],
        optional: [
          { id: 'mayo', name: 'Mayo', price: 0 },
          { id: 'mustard', name: 'Mustard', price: 0 },
          { id: 'onion', name: 'Onion', price: 0 },
        ],
        sandwichIngredients: (item.ingredients || []).map(ing => ({
          id: ing,
          name: sandwichIngredientNames[ing] || ing,
        })),
        isSandwich: true,
      };
    }
    if (item.hasHotSandwichMods) { // Hot sandwiches (meatball, sausage, chicken parm)
      return {
        title: 'Customize Your Sandwich',
        required: [],
        optional: [
          { id: 'extra-cheese', name: 'Extra Cheese', price: 1.5 },
        ],
      };
    }
    if (item.hasBreadChoice) { // Legacy sandwiches (fallback)
      return {
        title: 'Choose Your Bread',
        required: [
          { id: 'bread', name: 'Bread', options: ['Kaiser Roll', 'Rye', 'White Bread'] }
        ],
        optional: [
          { id: 'lettuce', name: 'Lettuce', price: 0 },
          { id: 'tomato', name: 'Tomato', price: 0 },
          { id: 'onion', name: 'Onion', price: 0 },
          { id: 'mayo', name: 'Mayo', price: 0 },
        ],
      };
    }
    if (item.hasPastaChoice) { // Pasta
      return {
        title: 'Choose Your Pasta',
        required: [
          { id: 'pasta', name: 'Pasta Type', options: ['Spaghetti', 'Ravioli (6)'] }
        ],
        optional: [
          { id: 'extra-sauce', name: 'Extra Sauce', price: 1 },
          { id: 'parmesan', name: 'Extra Parmesan', price: 0.5 },
        ],
      };
    }
    if (item.hasDressing) { // Salads
      return {
        title: 'Choose Your Dressing',
        required: [
          { id: 'dressing', name: 'Dressing', options: ['Ranch', 'Thousand Island', 'Creamy Italian', 'Lite Ranch', 'Honey Mustard', 'Bleu Cheese', 'Oil & Vinegar', 'No Dressing'] }
        ],
        optional: [
          { id: 'extra-meat', name: 'Extra Meat', price: 3 },
          { id: 'extra-cheese', name: 'Extra Cheese', price: 3 },
        ],
      };
    }
    if (item.hasGyroMods) { // Gyros
      return {
        title: 'Customize Your Gyro',
        required: [],
        optional: [
          { id: 'extra-tzatziki', name: 'Extra Tzatziki', price: 0 },
          { id: 'no-onion', name: 'No Onion', price: 0 },
          { id: 'no-tomato', name: 'No Tomato', price: 0 },
          { id: 'hot-sauce', name: 'Hot Sauce', price: 0 },
          { id: 'extra-meat', name: 'Extra Meat', price: 3 },
        ],
      };
    }
    if (item.hasQuesadillaMods) { // Quesadillas with ingredient toggle
      const ingredientNames = {
        'tomatoes': 'Tomatoes',
        'mushrooms': 'Mushrooms',
        'green-peppers': 'Green Peppers',
        'fried-onions': 'Fried Onions',
        'sour-cream': 'Sour Cream (on side)',
        'grilled-chicken': 'Grilled Chicken',
        'ground-beef': 'Ground Beef',
      };
      return {
        title: 'Customize Your Quesadilla',
        required: [],
        optional: (item.ingredients || []).map(ing => ({
          id: ing,
          name: ingredientNames[ing] || ing,
          price: 0,
          defaultChecked: true,
          isIngredient: true,
        })),
        isQuesadilla: true,
      };
    }
    if (item.hasWrapMods) { // Wraps with ingredient toggle
      const wrapIngredientNames = {
        'provolone': 'Provolone', 'ham': 'Ham', 'genoa-salami': 'Genoa Salami', 'cappicola': 'Cappicola',
        'lettuce': 'Lettuce', 'tomato': 'Tomato', 'onion': 'Onion', 'oil': 'Oil',
        'turkey': 'Turkey', 'spinach': 'Spinach', 'grilled-chicken': 'Grilled Chicken',
        'romaine': 'Romaine Lettuce', 'parmesan': 'Parmesan', 'caesar-dressing': 'Caesar Dressing',
        'tuna': 'Tuna', 'green-peppers': 'Green Peppers', 'sweet-peppers': 'Sweet Peppers',
        'steak': 'Steak', 'pepperoni': 'Pepperoni', 'mushrooms': 'Mushrooms', 'sauce': 'Sauce'
      };
      return {
        title: 'Customize Your Wrap',
        required: [],
        optional: [],
        wrapIngredients: (item.ingredients || []).map(ing => ({
          id: ing,
          name: wrapIngredientNames[ing] || ing,
        })),
        isWrap: true,
      };
    }
    if (item.has20ozChoice) { // 20oz Sodas
      return {
        title: 'Choose Your Flavor',
        required: [
          { id: 'flavor', name: 'Flavor', options: ['Pepsi', '7up', 'Diet Pepsi', 'Mountain Dew', 'Canada Dry Ginger Ale', 'Arizona Iced Tea', 'Sunkist Orange', 'Diet Sunkist', 'Root Beer'] }
        ],
        optional: [],
      };
    }
    if (item.hasCanChoice) { // Can Sodas (Day's)
      return {
        title: "Choose Your Day's Flavor",
        required: [
          { id: 'flavor', name: 'Flavor', options: ['Orange', 'Orange Mango', 'Grape', 'Black Cherry', 'Fruit Punch', 'Cola', 'Ginger Ale'] }
        ],
        optional: [],
      };
    }
    if (item.has2LiterChoice) { // 2 Liter Sodas
      return {
        title: 'Choose Your 2 Liter',
        required: [
          { id: 'flavor', name: 'Flavor', options: ['Pepsi', '7up', "Day's Ginger Ale", "Day's Grape", "Day's Orange"] }
        ],
        optional: [],
      };
    }
    if (item.hasChipsChoice) { // Herr's Chips
      return {
        title: 'Choose Your Flavor',
        required: [
          { id: 'flavor', name: 'Flavor', options: ['BBQ', 'Classic', 'Sour Cream & Onion'] }
        ],
        optional: [],
      };
    }
    if (item.hasCheesecakeChoice) { // Cheesecake
      return {
        title: 'Choose Your Topping',
        required: [
          { id: 'topping', name: 'Topping', options: ['Pineapple', 'Cherry', 'Strawberry'] }
        ],
        optional: [],
      };
    }
    if (item.hasIceCreamChoice) { // Ice Cream Pints
      return {
        title: 'Choose Your Flavor',
        required: [
          { id: 'flavor', name: 'Flavor', options: ['Chocolate', 'Vanilla', 'Strawberry'] }
        ],
        optional: [],
      };
    }
    if (item.hasMilkshakeChoice) { // Milkshakes
      return {
        title: 'Choose Your Flavor',
        required: [
          { id: 'flavor', name: 'Flavor', options: ['Chocolate', 'Vanilla', 'Strawberry', 'Black & White (Chocolate + Vanilla)'] }
        ],
        optional: [],
      };
    }
    return { title: item.name, required: [], optional: [] };
  };

  const options = getOptions();

  const toggleExtra = (id) => setExtras(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const getExtrasPrice = () => {
    return extras.reduce((sum, id) => {
      const opt = options.optional.find(o => o.id === id);
      return sum + (opt?.price || 0);
    }, 0);
  };

  const getPlatterFriesPrice = () => {
    return platterFriesOptions.reduce((sum, id) => {
      const opt = platterFriesOpts.find(o => o.id === id);
      return sum + (opt?.price || 0);
    }, 0);
  };

  const getTotalPrice = () => item.price + getExtrasPrice() + getPlatterFriesPrice();

  const toggleIngredient = (id) => {
    setIncludedIngredients(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const getMods = () => {
    const mods = [];
    // Add required selections
    Object.entries(selections).forEach(([key, value]) => {
      if (value) mods.push(value);
    });
    
    // For hoagies/sandwiches/wraps, track what was removed from ingredients
    if ((options.isHoagie || options.isSandwich || options.isWrap) && item.ingredients) {
      const removed = item.ingredients.filter(ing => !includedIngredients.includes(ing));
      if (removed.length > 0) {
        const ingredientNames = {
          'lettuce': 'Lettuce', 'tomato': 'Tomato', 'onion': 'Onion', 'oil': 'Oil',
          'american-cheese': 'American Cheese', 'provolone': 'Provolone', 'ham': 'Ham', 'turkey': 'Turkey',
          'genoa-salami': 'Genoa Salami', 'cappicola': 'Cappicola', 'tuna': 'Tuna', 'bacon': 'Bacon',
          'sweet-peppers': 'Sweet Peppers', 'green-peppers': 'Green Peppers', 'flounder': 'Flounder', 'mayo': 'Mayo',
          'spinach': 'Spinach', 'grilled-chicken': 'Grilled Chicken', 'romaine': 'Romaine', 'parmesan': 'Parmesan',
          'caesar-dressing': 'Caesar Dressing', 'steak': 'Steak', 'pepperoni': 'Pepperoni', 'mushrooms': 'Mushrooms', 'sauce': 'Sauce'
        };
        mods.push('NO: ' + removed.map(id => ingredientNames[id] || id).join(', '));
      }
      // Add extras for hoagies
      if (!options.isWrap) {
        extras.forEach(id => {
          const opt = options.optional.find(o => o.id === id);
          if (opt) mods.push(opt.name);
        });
      }
    } else if (options.isQuesadilla && item.ingredients) {
      // For quesadillas, track what was removed
      const removed = item.ingredients.filter(ing => !extras.includes(ing));
      if (removed.length > 0) {
        const ingredientNames = {
          'tomatoes': 'Tomatoes',
          'mushrooms': 'Mushrooms',
          'green-peppers': 'Green Peppers',
          'fried-onions': 'Fried Onions',
          'sour-cream': 'Sour Cream',
          'grilled-chicken': 'Grilled Chicken',
          'ground-beef': 'Ground Beef',
        };
        mods.push('NO: ' + removed.map(id => ingredientNames[id] || id).join(', '));
      }
    } else {
      // Add optional extras (other items)
      extras.forEach(id => {
        const opt = options.optional.find(o => o.id === id);
        if (opt) mods.push(opt.name);
      });
    }
    
    // Add platter fries options
    if (options.hasPlatterFries && platterFriesOptions.length > 0) {
      platterFriesOptions.forEach(id => {
        const opt = platterFriesOpts.find(o => o.id === id);
        if (opt) mods.push('Fries: ' + opt.name);
      });
    }
    
    return mods;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="red-banner">{options.title}</div>
        <div style={{ padding: 16 }}>
          
          {/* Item description */}
          {item.desc && (
            <div style={{ background: '#FFF8DC', border: '1px solid #DAA520', padding: 10, marginBottom: 16, fontSize: 13, color: '#8B4513' }}>
              {item.desc}
            </div>
          )}

          {/* Required selections */}
          {options.required.map(req => (
            <div key={req.id} style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#C41E3A' }}>
                {req.name.toUpperCase()} *
              </div>
              {req.options.map(opt => (
                <label key={opt} className="radio-row">
                  <input 
                    type="radio" 
                    name={req.id} 
                    checked={selections[req.id] === opt}
                    onChange={() => setSelections({ ...selections, [req.id]: opt })}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          ))}

          {/* Hoagie Ingredients - show FIRST for hoagies */}
          {options.hoagieIngredients && options.hoagieIngredients.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>
                INGREDIENTS <span style={{ fontWeight: 400, fontSize: 12 }}>(uncheck to remove)</span>
              </div>
              {options.hoagieIngredients.map(ing => (
                <label key={ing.id} className="checkbox-row">
                  <input type="checkbox" checked={includedIngredients.includes(ing.id)} onChange={() => toggleIngredient(ing.id)} />
                  <span style={{ 
                    flex: 1, 
                    textDecoration: !includedIngredients.includes(ing.id) ? 'line-through' : 'none',
                    color: !includedIngredients.includes(ing.id) ? '#999' : 'inherit'
                  }}>
                    {ing.name}
                  </span>
                  <span style={{ color: '#228B22', fontWeight: 600, fontSize: 11 }}>INCLUDED</span>
                </label>
              ))}
            </div>
          )}

          {/* Optional extras */}
          {options.optional.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>
                {options.isQuesadilla ? 'INGREDIENTS' : 'EXTRAS'} {options.isQuesadilla && <span style={{ fontWeight: 400, fontSize: 12 }}>(uncheck to remove)</span>}
              </div>
              {options.optional.map(opt => (
                <label key={opt.id} className="checkbox-row">
                  <input type="checkbox" checked={extras.includes(opt.id)} onChange={() => toggleExtra(opt.id)} />
                  <span style={{ 
                    flex: 1, 
                    textDecoration: options.isQuesadilla && !extras.includes(opt.id) ? 'line-through' : 'none',
                    color: options.isQuesadilla && !extras.includes(opt.id) ? '#999' : 'inherit'
                  }}>
                    {opt.name}
                  </span>
                  <span style={{ color: opt.price > 0 ? '#C41E3A' : '#228B22', fontWeight: 600 }}>
                    {options.isQuesadilla ? 'INCLUDED' : (opt.price > 0 ? `+$${opt.price.toFixed(2)}` : 'FREE')}
                  </span>
                </label>
              ))}
            </div>
          )}

          {/* Platter Fries Options */}
          {options.hasPlatterFries && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>FRIES OPTIONS</div>
              {platterFriesOpts.map(opt => (
                <label key={opt.id} className="checkbox-row">
                  <input type="checkbox" checked={platterFriesOptions.includes(opt.id)} onChange={() => togglePlatterFries(opt.id)} />
                  <span style={{ flex: 1 }}>{opt.name}</span>
                  <span style={{ color: opt.price > 0 ? '#C41E3A' : '#228B22', fontWeight: 600 }}>
                    {opt.price > 0 ? `+$${opt.price.toFixed(2)}` : 'FREE'}
                  </span>
                </label>
              ))}
            </div>
          )}

          {/* Sandwich Ingredients */}
          {options.sandwichIngredients && options.sandwichIngredients.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>
                INGREDIENTS <span style={{ fontWeight: 400, fontSize: 12 }}>(uncheck to remove)</span>
              </div>
              {options.sandwichIngredients.map(ing => (
                <label key={ing.id} className="checkbox-row">
                  <input type="checkbox" checked={includedIngredients.includes(ing.id)} onChange={() => toggleIngredient(ing.id)} />
                  <span style={{ 
                    flex: 1, 
                    textDecoration: !includedIngredients.includes(ing.id) ? 'line-through' : 'none',
                    color: !includedIngredients.includes(ing.id) ? '#999' : 'inherit'
                  }}>
                    {ing.name}
                  </span>
                  <span style={{ color: '#228B22', fontWeight: 600, fontSize: 11 }}>INCLUDED</span>
                </label>
              ))}
            </div>
          )}

          {/* Wrap Ingredients */}
          {options.wrapIngredients && options.wrapIngredients.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>
                INGREDIENTS <span style={{ fontWeight: 400, fontSize: 12 }}>(uncheck to remove)</span>
              </div>
              {options.wrapIngredients.map(ing => (
                <label key={ing.id} className="checkbox-row">
                  <input type="checkbox" checked={includedIngredients.includes(ing.id)} onChange={() => toggleIngredient(ing.id)} />
                  <span style={{ 
                    flex: 1, 
                    textDecoration: !includedIngredients.includes(ing.id) ? 'line-through' : 'none',
                    color: !includedIngredients.includes(ing.id) ? '#999' : 'inherit'
                  }}>
                    {ing.name}
                  </span>
                  <span style={{ color: '#228B22', fontWeight: 600, fontSize: 11 }}>INCLUDED</span>
                </label>
              ))}
            </div>
          )}

          <div style={{ borderTop: '2px solid #C41E3A', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 12, color: '#666' }}>Total</div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 26, fontWeight: 700, color: '#C41E3A' }}>${getTotalPrice().toFixed(2)}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="button" className="btn-outline" onClick={onClose}>Cancel</button>
              <button type="button"
                className="btn-red" 
                onClick={() => onAdd({ name: item.name, price: getTotalPrice(), mods: getMods() })}
                disabled={options.required.some(req => !selections[req.id])}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ SIDES MENU WITH MODIFIERS ============
function SidesMenu({ items, onAddToCart }) {
  const [customizing, setCustomizing] = useState(null);

  return (
    <div className="menu-section">
      <div className="green-stripe" />
      <div className="red-banner">Sides & Appetizers</div>
      <div className="menu-section-content">
        {items.map((item, i) => (
          <div 
            key={i} 
            className="menu-item" 
            style={{ alignItems: 'center' }}
          >
            <div style={{ flex: 1 }}>
              <span className="item-name">{item.name}</span>
              {item.badge && <span className="badge-new">{item.badge}</span>}
              {item.desc && <div className="item-desc">{item.desc}</div>}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className="item-price">
                {item.hasSize 
                  ? `$${item.prices.small} - $${item.prices.large}`
                  : `$${item.price?.toFixed(2)}`
                }
              </span>
              <button type="button"
                className="add-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  if (item.hasCondiments || item.hasDippingSauce || item.hasSize) {
                    setCustomizing(item);
                  } else {
                    onAddToCart({ name: item.name, price: item.price, mods: [] });
                  }
                }}
              >
                + ADD
              </button>
            </div>
          </div>
        ))}
      </div>

      {customizing && (
        <SidesCustomizer
          item={customizing}
          onClose={() => setCustomizing(null)}
          onAdd={(item) => { onAddToCart(item); setCustomizing(null); }}
        />
      )}
    </div>
  );
}

// ============ SIDES CUSTOMIZER ============
function SidesCustomizer({ item, onClose, onAdd }) {
  const [size, setSize] = useState('small');
  const [condiments, setCondiments] = useState([]);
  const [paidExtras, setPaidExtras] = useState([]);
  const [dippingSauce, setDippingSauce] = useState('');

  const condimentOptions = ['Salt', 'Pepper', 'Ketchup', 'Hot Sauce'];
  const paidCondimentOptions = [
    { id: 'cheese-whiz', name: 'Cheese Whiz', price: 2 },
  ];
  const dippingSauceOptions = ['Marinara', 'Ranch', 'Honey Mustard', 'BBQ Sauce', 'Bleu Cheese'];

  const toggleCondiment = (c) => setCondiments(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  const togglePaidExtra = (id) => setPaidExtras(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const getBasePrice = () => {
    if (item.hasSize) {
      return item.prices[size];
    }
    return item.price;
  };

  const getExtrasPrice = () => {
    return paidExtras.reduce((sum, id) => {
      const extra = paidCondimentOptions.find(x => x.id === id);
      return sum + (extra ? extra.price : 0);
    }, 0);
  };

  const getTotalPrice = () => getBasePrice() + getExtrasPrice();

  const getMods = () => {
    const mods = [];
    if (item.hasSize) {
      mods.push(size === 'large' ? 'Large' : 'Small');
    }
    if (condiments.length > 0) mods.push(condiments.join(', '));
    paidExtras.forEach(id => {
      const extra = paidCondimentOptions.find(x => x.id === id);
      if (extra) mods.push(extra.name);
    });
    if (dippingSauce) mods.push(`Dipping: ${dippingSauce}`);
    return mods;
  };

  const getItemName = () => {
    if (item.hasSize) {
      return `${item.name} (${size === 'large' ? 'Large' : 'Small'})`;
    }
    return item.name;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="red-banner">{item.name}</div>
        <div style={{ padding: 16 }}>
          
          {/* Size Selection */}
          {item.hasSize && (
            <>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>SELECT SIZE</div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <button type="button"
                  className={`size-btn ${size === 'small' ? 'selected' : ''}`}
                  onClick={() => setSize('small')}
                  style={{ flex: 1 }}
                >
                  <div style={{ fontSize: 14 }}>Small</div>
                  <div style={{ fontSize: 18, fontWeight: 700 }}>${item.prices.small}</div>
                </button>
                <button type="button"
                  className={`size-btn ${size === 'large' ? 'selected' : ''}`}
                  onClick={() => setSize('large')}
                  style={{ flex: 1 }}
                >
                  <div style={{ fontSize: 14 }}>Large</div>
                  <div style={{ fontSize: 18, fontWeight: 700 }}>${item.prices.large}</div>
                </button>
              </div>
            </>
          )}

          {/* Free Condiments */}
          {item.hasCondiments && (
            <>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>CONDIMENTS (FREE)</div>
              <div style={{ marginBottom: 16 }}>
                {condimentOptions.map(c => (
                  <label key={c} className="checkbox-row">
                    <input type="checkbox" checked={condiments.includes(c)} onChange={() => toggleCondiment(c)} />
                    <span style={{ flex: 1 }}>{c}</span>
                    <span style={{ color: '#228B22', fontWeight: 600 }}>FREE</span>
                  </label>
                ))}
              </div>
              
              {/* Paid Extras */}
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>EXTRAS</div>
              <div style={{ marginBottom: 16 }}>
                {paidCondimentOptions.map(extra => (
                  <label key={extra.id} className="checkbox-row">
                    <input type="checkbox" checked={paidExtras.includes(extra.id)} onChange={() => togglePaidExtra(extra.id)} />
                    <span style={{ flex: 1 }}>{extra.name}</span>
                    <span style={{ color: '#C41E3A', fontWeight: 600 }}>+${extra.price}</span>
                  </label>
                ))}
              </div>
            </>
          )}

          {/* Dipping Sauce */}
          {item.hasDippingSauce && (
            <>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>DIPPING SAUCE (FREE)</div>
              <div style={{ marginBottom: 16 }}>
                <label className="radio-row">
                  <input type="radio" name="sauce" checked={dippingSauce === ''} onChange={() => setDippingSauce('')} />
                  <span>No Sauce</span>
                </label>
                {dippingSauceOptions.map(s => (
                  <label key={s} className="radio-row">
                    <input type="radio" name="sauce" checked={dippingSauce === s} onChange={() => setDippingSauce(s)} />
                    <span style={{ flex: 1 }}>{s}</span>
                    <span style={{ color: '#228B22', fontWeight: 600 }}>FREE</span>
                  </label>
                ))}
              </div>
            </>
          )}

          <div style={{ borderTop: '2px solid #C41E3A', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 12, color: '#666' }}>Total</div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 26, fontWeight: 700, color: '#C41E3A' }}>${getTotalPrice().toFixed(2)}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="button" className="btn-outline" onClick={onClose}>Cancel</button>
              <button type="button" className="btn-red" onClick={() => onAdd({ name: getItemName(), price: getTotalPrice(), mods: getMods() })}>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ SEAFOOD MENU WITH PLATTER MODIFIERS ============
function SeafoodMenu({ items, onAddToCart }) {
  const [customizing, setCustomizing] = useState(null);

  return (
    <div className="menu-section">
      <div className="green-stripe" />
      <div className="red-banner">Seafood Platters</div>
      <div className="menu-section-content">
        <div style={{ fontSize: 12, color: '#666', fontStyle: 'italic', marginBottom: 12 }}>
          All Platters Served with French Fries, Cole Slaw, Tartar Sauce, Roll & Butter
        </div>
        {items.map((item, i) => (
          <div 
            key={i} 
            className="menu-item" 
            style={{ alignItems: 'center' }}
          >
            <div style={{ flex: 1 }}>
              <span className="item-name">{item.name}</span>
              {item.desc && <div className="item-desc">{item.desc}</div>}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className="item-price">${item.price.toFixed(2)}</span>
              <button type="button"
                className="add-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  if (item.isPlatter) {
                    setCustomizing(item);
                  } else {
                    onAddToCart({ name: item.name, price: item.price, mods: [] });
                  }
                }}
              >
                + ADD
              </button>
            </div>
          </div>
        ))}
      </div>

      {customizing && (
        <SeafoodPlatterCustomizer
          item={customizing}
          onClose={() => setCustomizing(null)}
          onAdd={(item) => { onAddToCart(item); setCustomizing(null); }}
        />
      )}
    </div>
  );
}

// ============ CLUBS MENU ============
function ClubsMenu({ items, onAddToCart }) {
  const [customizing, setCustomizing] = useState(null);

  return (
    <div className="menu-section">
      <div className="green-stripe" />
      <div className="red-banner">Double Clubs</div>
      <div className="menu-section-content">
        <div style={{ fontSize: 12, color: '#666', fontStyle: 'italic', marginBottom: 12 }}>
          All Clubs Served with French Fries
        </div>
        {items.map((item, i) => (
          <div key={i} className="menu-item" style={{ alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <span className="item-name">{item.name}</span>
              {item.desc && <div className="item-desc">{item.desc}</div>}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className="item-price">${item.price.toFixed(2)}</span>
              <button type="button"
                className="add-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setCustomizing(item);
                }}
              >
                + ADD
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Club Customizer Modal */}
      {customizing && (
        <ClubCustomizer
          item={customizing}
          onClose={() => setCustomizing(null)}
          onAdd={(item) => { onAddToCart(item); setCustomizing(null); }}
        />
      )}
    </div>
  );
}

// ============ CLUB CUSTOMIZER ============
function ClubCustomizer({ item, onClose, onAdd }) {
  const [includedIngredients, setIncludedIngredients] = useState(item.ingredients || []);
  const [friesOptions, setFriesOptions] = useState([]);

  const ingredientNames = {
    'turkey': 'Turkey',
    'bacon': 'Bacon',
    'lettuce': 'Lettuce',
    'tomato': 'Tomato',
    'mayo': 'Mayo',
    'ham': 'Ham',
    'american-cheese': 'American Cheese',
    'tuna-salad': 'Tuna Salad',
    'tomato-dressing': 'Tomato Dressing',
    'grilled-chicken': 'Grilled Chicken',
  };

  const friesOpts = [
    { id: 'fries-salt', name: 'Salt on Fries', price: 0 },
    { id: 'fries-pepper', name: 'Pepper on Fries', price: 0 },
    { id: 'fries-ketchup', name: 'Ketchup on Fries', price: 0 },
    { id: 'cheese-whiz', name: 'Cheese Whiz on Fries', price: 2 },
  ];

  const toggleIngredient = (id) => {
    setIncludedIngredients(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleFries = (id) => {
    setFriesOptions(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const getPrice = () => {
    let total = item.price;
    friesOptions.forEach(id => { const f = friesOpts.find(x => x.id === id); if (f) total += f.price; });
    return total;
  };

  const getMods = () => {
    const mods = ['With Fries'];
    
    // Find removed ingredients
    const removed = (item.ingredients || []).filter(ing => !includedIngredients.includes(ing));
    if (removed.length > 0) {
      mods.push('NO: ' + removed.map(id => ingredientNames[id] || id).join(', '));
    }
    
    friesOptions.forEach(id => { const f = friesOpts.find(x => x.id === id); if (f) mods.push(f.name); });
    return mods;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="red-banner">Customize {item.name}</div>
        <div style={{ padding: 16 }}>
          
          <div style={{ background: '#FFF8DC', border: '1px solid #DAA520', padding: 10, marginBottom: 16, fontSize: 13, color: '#8B4513' }}>
            <strong>Includes:</strong> {item.desc || 'Club sandwich'} + French Fries
          </div>

          {/* Ingredients */}
          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>
            SANDWICH INGREDIENTS <span style={{ fontWeight: 400, fontSize: 12 }}>(uncheck to remove)</span>
          </div>
          <div style={{ marginBottom: 16, border: '1px solid #ddd', padding: 8, background: 'white' }}>
            {(item.ingredients || []).map(ingId => (
              <label key={ingId} className="checkbox-row">
                <input 
                  type="checkbox" 
                  checked={includedIngredients.includes(ingId)} 
                  onChange={() => toggleIngredient(ingId)} 
                />
                <span style={{ flex: 1, textDecoration: includedIngredients.includes(ingId) ? 'none' : 'line-through', color: includedIngredients.includes(ingId) ? 'inherit' : '#999' }}>
                  {ingredientNames[ingId] || ingId}
                </span>
                <span style={{ color: '#228B22', fontWeight: 600, fontSize: 11 }}>INCLUDED</span>
              </label>
            ))}
          </div>

          {/* Fries Options */}
          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>FRIES OPTIONS</div>
          <div style={{ marginBottom: 16 }}>
            {friesOpts.map(f => (
              <label key={f.id} className="checkbox-row">
                <input type="checkbox" checked={friesOptions.includes(f.id)} onChange={() => toggleFries(f.id)} />
                <span style={{ flex: 1 }}>{f.name}</span>
                <span style={{ color: f.price > 0 ? '#C41E3A' : '#228B22', fontWeight: 600 }}>{f.price > 0 ? `+$${f.price}` : 'FREE'}</span>
              </label>
            ))}
          </div>

          <div style={{ borderTop: '2px solid #C41E3A', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 12, color: '#666' }}>Total</div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 26, fontWeight: 700, color: '#C41E3A' }}>${getPrice().toFixed(2)}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="button" className="btn-outline" onClick={onClose}>Cancel</button>
              <button type="button" className="btn-red" onClick={() => onAdd({ name: item.name, price: getPrice(), mods: getMods() })}>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ LUNCH SPECIAL CUSTOMIZER ============
function LunchSpecialCustomizer({ item, onClose, onAdd }) {
  // Fries options (for items with fries)
  const [friesOptions, setFriesOptions] = useState([]);
  // Soda selection
  const [soda, setSoda] = useState('');
  // Wings sauce
  const [wingsSauce, setWingsSauce] = useState('');
  // Fingers dip
  const [fingersDip, setFingersDip] = useState('');
  // Salad dressing
  const [saladDressing, setSaladDressing] = useState('');
  // Extra price for upgrades
  const [extraPrice, setExtraPrice] = useState(0);
  
  // Turkey hoagie ingredients (for #3)
  const turkeyHoagieIngredients = ['turkey', 'american-cheese', 'lettuce', 'tomato', 'onion', 'oil', 'mayo'];
  const [hoagieIngredients, setHoagieIngredients] = useState([...turkeyHoagieIngredients]);
  const [hoagieExtras, setHoagieExtras] = useState([]);
  
  // Chef salad ingredients (for #7)
  const chefSaladIngredients = ['ham', 'turkey', 'american-cheese', 'lettuce', 'tomato', 'cucumber', 'onion', 'green-peppers', 'egg'];
  const [saladIngredients, setSaladIngredients] = useState([...chefSaladIngredients]);
  
  // Grilled chicken caesar ingredients (for #14)
  const caesarIngredients = ['grilled-chicken', 'romaine', 'parmesan', 'croutons', 'caesar-dressing'];
  const [caesarIngs, setCaesarIngs] = useState([...caesarIngredients]);
  
  // Cheeseburger options (for #10)
  const [burgerExtras, setBurgerExtras] = useState([]);
  
  // Wrap ingredients (for #15)
  const wrapIngredients = ['grilled-chicken', 'lettuce', 'tomato', 'onion'];
  const [wrapIngs, setWrapIngs] = useState([...wrapIngredients]);

  const hasFries = item.name.includes('Fries');
  const hasWings = item.name.includes('Wings');
  const hasFingers = item.name.includes('Fingers');
  const isChefSalad = item.num === 7;
  const isCaesarSalad = item.num === 14;
  const isTurkeyHoagie = item.num === 3;
  const isBurger = item.num === 10;
  const isWrap = item.num === 15;
  const isLunchWings = item.num === 9; // #9 4 Wings special

  const sodaOptions = ['Orange', 'Orange Mango', 'Grape', 'Black Cherry', 'Fruit Punch', 'Cola', 'Ginger Ale'];
  const wingSauces = ['Mild', 'Hot', 'BBQ', 'Plain'];
  const dipSauces = ['Honey Mustard', 'BBQ', 'Ranch', 'No Sauce'];
  const saladDressings = ['Ranch', 'Thousand Island', 'Creamy Italian', 'Lite Ranch', 'Honey Mustard', 'Bleu Cheese', 'Oil & Vinegar', 'No Dressing'];
  
  // Wing options for #9 (chicken wings style - not buffalo)
  const lunchWingOpts = [
    { id: 'wing-salt', name: 'Salt', price: 0 },
    { id: 'wing-pepper', name: 'Pepper', price: 0 },
    { id: 'wing-ketchup', name: 'Ketchup', price: 0 },
    { id: 'wing-hot-sauce', name: 'Hot Sauce on the Side', price: 0 },
    { id: 'wing-bleu-cheese', name: 'Bleu Cheese', price: 1 },
    { id: 'wing-ranch', name: 'Ranch', price: 1 },
  ];
  const [lunchWingOptions, setLunchWingOptions] = useState([]);
  
  const toggleLunchWingOption = (id) => {
    const opt = lunchWingOpts.find(o => o.id === id);
    if (lunchWingOptions.includes(id)) {
      setLunchWingOptions(prev => prev.filter(x => x !== id));
      if (opt?.price) setExtraPrice(prev => prev - opt.price);
    } else {
      setLunchWingOptions(prev => [...prev, id]);
      if (opt?.price) setExtraPrice(prev => prev + opt.price);
    }
  };
  
  const friesOpts = [
    { id: 'fries-salt', name: 'Salt', price: 0 },
    { id: 'fries-pepper', name: 'Pepper', price: 0 },
    { id: 'fries-ketchup', name: 'Ketchup', price: 0 },
    { id: 'cheese-whiz', name: 'Cheese Whiz', price: 2 },
  ];
  
  const hoagieExtraOpts = [
    { id: 'salt', name: 'Salt', price: 0 },
    { id: 'pepper', name: 'Pepper', price: 0 },
    { id: 'olive-oil', name: 'Olive Oil', price: 0 },
    { id: 'hot-peppers', name: 'Hot Peppers', price: 0 },
    { id: 'oregano', name: 'Oregano', price: 0 },
  ];
  
  const burgerOpts = [
    { id: 'lettuce-tomato', name: 'Lettuce & Tomato', price: 1 },
    { id: 'pickles', name: 'Pickles', price: 0 },
    { id: 'raw-onions', name: 'Raw Onions', price: 0 },
    { id: 'grilled-onions', name: 'Grilled Onions', price: 0 },
    { id: 'ketchup', name: 'Ketchup', price: 0 },
    { id: 'mustard', name: 'Mustard', price: 0 },
    { id: 'mayo', name: 'Mayo', price: 0 },
    { id: 'salt', name: 'Salt', price: 0 },
    { id: 'pepper', name: 'Pepper', price: 0 },
  ];

  // Steak cheese choice (for #2, #4, #6) - American only for lunch specials
  const steakCheeseOptions = ['American'];
  const [steakCheese, setSteakCheese] = useState('American');
  
  // Steak add-ons (for #2, #4, #6)
  const steakAddOns = [
    { id: 'steak-salt', name: 'Salt', price: 0 },
    { id: 'steak-pepper', name: 'Pepper', price: 0 },
    { id: 'steak-ketchup', name: 'Ketchup', price: 0 },
    { id: 'steak-fried-onions', name: 'Fried Onions', price: 0 },
    { id: 'steak-green-peppers', name: 'Green Peppers', price: 2 },
    { id: 'steak-mushrooms', name: 'Mushrooms', price: 2 },
    { id: 'steak-bacon', name: 'Bacon', price: 2 },
    { id: 'steak-hot-peppers', name: 'Hot Peppers', price: 0 },
    { id: 'steak-sweet-peppers', name: 'Sweet Peppers', price: 1 },
    { id: 'steak-pepperoni', name: 'Pepperoni', price: 2 },
    { id: 'steak-pizza-sauce', name: 'Pizza Sauce', price: 2 },
  ];
  const [steakOptions, setSteakOptions] = useState([]);
  
  // Steak extras (for #2, #4, #6)
  const steakExtras = [
    { id: 'extra-meat', name: 'Extra Meat', price: 3 },
    { id: 'extra-cheese', name: 'Extra Cheese', price: 1 },
  ];
  const [steakExtraOptions, setSteakExtraOptions] = useState([]);
  
  // Toast the roll option
  const [toastRoll, setToastRoll] = useState(false);
  
  const hasSteak = [2, 4, 6].includes(item.num);

  const toggleSteakOption = (id) => {
    const opt = steakAddOns.find(o => o.id === id);
    if (steakOptions.includes(id)) {
      setSteakOptions(prev => prev.filter(x => x !== id));
      if (opt?.price) setExtraPrice(prev => prev - opt.price);
    } else {
      setSteakOptions(prev => [...prev, id]);
      if (opt?.price) setExtraPrice(prev => prev + opt.price);
    }
  };
  
  const toggleSteakExtra = (id) => {
    const opt = steakExtras.find(o => o.id === id);
    if (steakExtraOptions.includes(id)) {
      setSteakExtraOptions(prev => prev.filter(x => x !== id));
      if (opt?.price) setExtraPrice(prev => prev - opt.price);
    } else {
      setSteakExtraOptions(prev => [...prev, id]);
      if (opt?.price) setExtraPrice(prev => prev + opt.price);
    }
  };

  const ingredientNames = {
    'turkey': 'Turkey', 'american-cheese': 'American Cheese', 'lettuce': 'Lettuce', 
    'tomato': 'Tomato', 'onion': 'Onion', 'oil': 'Oil', 'mayo': 'Mayo',
    'ham': 'Ham', 'cucumber': 'Cucumber', 'green-peppers': 'Green Peppers', 'egg': 'Egg',
    'grilled-chicken': 'Grilled Chicken', 'romaine': 'Romaine Lettuce', 'parmesan': 'Parmesan', 
    'croutons': 'Croutons', 'caesar-dressing': 'Caesar Dressing'
  };

  const toggleFries = (id) => {
    const opt = friesOpts.find(f => f.id === id);
    if (friesOptions.includes(id)) {
      setFriesOptions(prev => prev.filter(x => x !== id));
      if (opt?.price) setExtraPrice(prev => prev - opt.price);
    } else {
      setFriesOptions(prev => [...prev, id]);
      if (opt?.price) setExtraPrice(prev => prev + opt.price);
    }
  };

  const toggleHoagieIngredient = (id) => {
    setHoagieIngredients(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleHoagieExtra = (id) => {
    setHoagieExtras(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleSaladIngredient = (id) => {
    setSaladIngredients(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleCaesarIngredient = (id) => {
    setCaesarIngs(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleBurgerExtra = (id) => {
    setBurgerExtras(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleWrapIngredient = (id) => {
    setWrapIngs(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const getMods = () => {
    const mods = ['Lunch Special'];
    
    if (fingersDip) mods.push(fingersDip);
    if (saladDressing) mods.push(saladDressing + ' Dressing');
    
    // Lunch wings options (#9) - chicken wing style
    if (isLunchWings) {
      if (lunchWingOptions.length === 0) {
        mods.push('Wings: Plain');
      } else {
        lunchWingOptions.forEach(id => {
          const opt = lunchWingOpts.find(o => o.id === id);
          if (opt) mods.push('Wings: ' + opt.name);
        });
      }
    }
    
    // Turkey hoagie removals
    if (isTurkeyHoagie) {
      const removed = turkeyHoagieIngredients.filter(ing => !hoagieIngredients.includes(ing));
      if (removed.length > 0) mods.push('NO: ' + removed.map(id => ingredientNames[id] || id).join(', '));
      hoagieExtras.forEach(id => {
        const opt = hoagieExtraOpts.find(o => o.id === id);
        if (opt) mods.push(opt.name);
      });
    }
    
    // Chef salad removals
    if (isChefSalad) {
      const removed = chefSaladIngredients.filter(ing => !saladIngredients.includes(ing));
      if (removed.length > 0) mods.push('NO: ' + removed.map(id => ingredientNames[id] || id).join(', '));
    }
    
    // Caesar salad removals
    if (isCaesarSalad) {
      const removed = caesarIngredients.filter(ing => !caesarIngs.includes(ing));
      if (removed.length > 0) mods.push('NO: ' + removed.map(id => ingredientNames[id] || id).join(', '));
    }
    
    // Burger extras
    if (isBurger) {
      burgerExtras.forEach(id => {
        const opt = burgerOpts.find(o => o.id === id);
        if (opt) mods.push(opt.name);
      });
    }
    
    // Steak options - full customization
    if (hasSteak) {
      // Cheese
      if (steakCheese && steakCheese !== 'No Cheese') {
        mods.push(steakCheese + ' Cheese');
      } else if (steakCheese === 'No Cheese') {
        mods.push('No Cheese');
      }
      // Add-ons
      steakOptions.forEach(id => {
        const opt = steakAddOns.find(o => o.id === id);
        if (opt) mods.push(opt.name);
      });
      // Extras
      steakExtraOptions.forEach(id => {
        const opt = steakExtras.find(o => o.id === id);
        if (opt) mods.push(opt.name);
      });
      // Toast the roll
      if (toastRoll) mods.push('Toast the Roll');
    }
    
    // Wrap removals
    if (isWrap) {
      const removed = wrapIngredients.filter(ing => !wrapIngs.includes(ing));
      if (removed.length > 0) mods.push('NO: ' + removed.map(id => ingredientNames[id] || id).join(', '));
    }
    
    // Fries options - show Plain if no selections
    if (hasFries) {
      if (friesOptions.length === 0) {
        mods.push('Fries: Plain');
      } else {
        friesOptions.forEach(id => {
          const f = friesOpts.find(x => x.id === id);
          if (f) mods.push('Fries: ' + f.name);
        });
      }
    }
    
    if (soda) mods.push("Day's " + soda);
    return mods;
  };

  // Calculate extra price including burger lettuce/tomato
  const getBurgerExtraPrice = () => {
    if (!isBurger) return 0;
    return burgerExtras.includes('lettuce-tomato') ? 1 : 0;
  };

  const canAdd = () => {
    if (!soda) return false;
    // Wings #9 uses checkboxes, no required selection
    if (hasFingers && !fingersDip) return false;
    if (isChefSalad && !saladDressing) return false;
    return true;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="red-banner">Customize #{item.num} {item.name}</div>
        <div style={{ padding: 16, maxHeight: '70vh', overflowY: 'auto' }}>
          
          <div style={{ background: '#FFF8DC', border: '1px solid #DAA520', padding: 10, marginBottom: 16, fontSize: 14, color: '#8B4513', fontWeight: 600 }}>
            $10 Lunch Special • No Substitutions
          </div>

          {/* Wings Options for #9 (chicken wing style - checkboxes) */}
          {isLunchWings && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>WING OPTIONS</div>
              {lunchWingOpts.map(opt => (
                <label key={opt.id} className="checkbox-row">
                  <input type="checkbox" checked={lunchWingOptions.includes(opt.id)} onChange={() => toggleLunchWingOption(opt.id)} />
                  <span style={{ flex: 1 }}>{opt.name}</span>
                  <span style={{ color: opt.price > 0 ? '#C41E3A' : '#228B22', fontWeight: 600 }}>{opt.price > 0 ? `+$${opt.price.toFixed(2)}` : 'FREE'}</span>
                </label>
              ))}
            </div>
          )}

          {/* Fingers Dip */}
          {hasFingers && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#C41E3A' }}>DIPPING SAUCE *</div>
              {dipSauces.map(s => (
                <label key={s} className="radio-row">
                  <input type="radio" name="dip" checked={fingersDip === s} onChange={() => setFingersDip(s)} />
                  <span style={{ flex: 1 }}>{s}</span>
                </label>
              ))}
            </div>
          )}

          {/* Turkey Hoagie Ingredients (#3) */}
          {isTurkeyHoagie && (
            <>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>
                  TURKEY HOAGIE INGREDIENTS <span style={{ fontWeight: 400, fontSize: 12 }}>(uncheck to remove)</span>
                </div>
                {turkeyHoagieIngredients.map(ing => (
                  <label key={ing} className="checkbox-row">
                    <input type="checkbox" checked={hoagieIngredients.includes(ing)} onChange={() => toggleHoagieIngredient(ing)} />
                    <span style={{ flex: 1, textDecoration: !hoagieIngredients.includes(ing) ? 'line-through' : 'none', color: !hoagieIngredients.includes(ing) ? '#999' : 'inherit' }}>
                      {ingredientNames[ing] || ing}
                    </span>
                    <span style={{ color: '#228B22', fontWeight: 600, fontSize: 11 }}>INCLUDED</span>
                  </label>
                ))}
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>EXTRAS</div>
                {hoagieExtraOpts.map(opt => (
                  <label key={opt.id} className="checkbox-row">
                    <input type="checkbox" checked={hoagieExtras.includes(opt.id)} onChange={() => toggleHoagieExtra(opt.id)} />
                    <span style={{ flex: 1 }}>{opt.name}</span>
                    <span style={{ color: '#228B22', fontWeight: 600 }}>FREE</span>
                  </label>
                ))}
              </div>
            </>
          )}

          {/* Chef Salad Ingredients (#7) */}
          {isChefSalad && (
            <>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>
                  CHEF SALAD INGREDIENTS <span style={{ fontWeight: 400, fontSize: 12 }}>(uncheck to remove)</span>
                </div>
                {chefSaladIngredients.map(ing => (
                  <label key={ing} className="checkbox-row">
                    <input type="checkbox" checked={saladIngredients.includes(ing)} onChange={() => toggleSaladIngredient(ing)} />
                    <span style={{ flex: 1, textDecoration: !saladIngredients.includes(ing) ? 'line-through' : 'none', color: !saladIngredients.includes(ing) ? '#999' : 'inherit' }}>
                      {ingredientNames[ing] || ing}
                    </span>
                    <span style={{ color: '#228B22', fontWeight: 600, fontSize: 11 }}>INCLUDED</span>
                  </label>
                ))}
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#C41E3A' }}>DRESSING *</div>
                {saladDressings.map(d => (
                  <label key={d} className="radio-row">
                    <input type="radio" name="dressing" checked={saladDressing === d} onChange={() => setSaladDressing(d)} />
                    <span style={{ flex: 1 }}>{d}</span>
                  </label>
                ))}
              </div>
            </>
          )}

          {/* Grilled Chicken Caesar (#14) */}
          {isCaesarSalad && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>
                CAESAR SALAD INGREDIENTS <span style={{ fontWeight: 400, fontSize: 12 }}>(uncheck to remove)</span>
              </div>
              {caesarIngredients.map(ing => (
                <label key={ing} className="checkbox-row">
                  <input type="checkbox" checked={caesarIngs.includes(ing)} onChange={() => toggleCaesarIngredient(ing)} />
                  <span style={{ flex: 1, textDecoration: !caesarIngs.includes(ing) ? 'line-through' : 'none', color: !caesarIngs.includes(ing) ? '#999' : 'inherit' }}>
                    {ingredientNames[ing] || ing}
                  </span>
                  <span style={{ color: '#228B22', fontWeight: 600, fontSize: 11 }}>INCLUDED</span>
                </label>
              ))}
            </div>
          )}

          {/* Cheeseburger Options (#10) */}
          {isBurger && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>BURGER OPTIONS</div>
              {burgerOpts.map(opt => (
                <label key={opt.id} className="checkbox-row">
                  <input type="checkbox" checked={burgerExtras.includes(opt.id)} onChange={() => toggleBurgerExtra(opt.id)} />
                  <span style={{ flex: 1 }}>{opt.name}</span>
                  <span style={{ color: opt.price > 0 ? '#C41E3A' : '#228B22', fontWeight: 600 }}>{opt.price > 0 ? `+$${opt.price}` : 'FREE'}</span>
                </label>
              ))}
            </div>
          )}

          {/* Steak Options (#2, #4, #6) */}
          {hasSteak && (
            <>
              {/* Cheese Choice */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>CHEESE</div>
                <div style={{ fontSize: 11, color: '#666', fontStyle: 'italic', marginBottom: 8 }}>
                  Lunch specials come with American cheese only
                </div>
                <label className="radio-row">
                  <input type="radio" name="steakCheese" checked={steakCheese === 'American'} onChange={() => setSteakCheese('American')} />
                  <span style={{ flex: 1 }}>American Cheese</span>
                  <span style={{ color: '#228B22', fontWeight: 600 }}>INCLUDED</span>
                </label>
              </div>
              
              {/* Add-Ons */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>ADD-ONS</div>
                {steakAddOns.map(opt => (
                  <label key={opt.id} className="checkbox-row">
                    <input type="checkbox" checked={steakOptions.includes(opt.id)} onChange={() => toggleSteakOption(opt.id)} />
                    <span style={{ flex: 1 }}>{opt.name}</span>
                    <span style={{ color: opt.price > 0 ? '#C41E3A' : '#228B22', fontWeight: 600 }}>{opt.price > 0 ? `+$${opt.price}` : 'FREE'}</span>
                  </label>
                ))}
              </div>
              
              {/* Extras */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>EXTRAS</div>
                {steakExtras.map(opt => (
                  <label key={opt.id} className="checkbox-row">
                    <input type="checkbox" checked={steakExtraOptions.includes(opt.id)} onChange={() => toggleSteakExtra(opt.id)} />
                    <span style={{ flex: 1 }}>{opt.name}</span>
                    <span style={{ color: '#C41E3A', fontWeight: 600 }}>+${opt.price.toFixed(2)}</span>
                  </label>
                ))}
              </div>
              
              {/* Toast the Roll */}
              <div style={{ marginBottom: 16 }}>
                <label className="checkbox-row">
                  <input type="checkbox" checked={toastRoll} onChange={() => setToastRoll(!toastRoll)} />
                  <span style={{ flex: 1 }}>Toast the Roll</span>
                  <span style={{ color: '#228B22', fontWeight: 600 }}>FREE</span>
                </label>
              </div>
            </>
          )}

          {/* Grilled Chicken Wrap (#15) */}
          {isWrap && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>
                WRAP INGREDIENTS <span style={{ fontWeight: 400, fontSize: 12 }}>(uncheck to remove)</span>
              </div>
              {wrapIngredients.map(ing => (
                <label key={ing} className="checkbox-row">
                  <input type="checkbox" checked={wrapIngs.includes(ing)} onChange={() => toggleWrapIngredient(ing)} />
                  <span style={{ flex: 1, textDecoration: !wrapIngs.includes(ing) ? 'line-through' : 'none', color: !wrapIngs.includes(ing) ? '#999' : 'inherit' }}>
                    {ingredientNames[ing] || ing}
                  </span>
                  <span style={{ color: '#228B22', fontWeight: 600, fontSize: 11 }}>INCLUDED</span>
                </label>
              ))}
            </div>
          )}

          {/* Fries Options */}
          {hasFries && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>FRIES OPTIONS</div>
              {friesOpts.map(f => (
                <label key={f.id} className="checkbox-row">
                  <input type="checkbox" checked={friesOptions.includes(f.id)} onChange={() => toggleFries(f.id)} />
                  <span style={{ flex: 1 }}>{f.name}</span>
                  <span style={{ color: f.price > 0 ? '#C41E3A' : '#228B22', fontWeight: 600 }}>{f.price > 0 ? `+$${f.price}` : 'FREE'}</span>
                </label>
              ))}
            </div>
          )}

          {/* Can Soda Selection */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#C41E3A' }}>CHOOSE YOUR DAY'S SODA *</div>
            <div style={{ fontSize: 11, color: '#666', fontStyle: 'italic', marginBottom: 8 }}>
              If your selected flavor is unavailable, we will substitute at our discretion.
            </div>
            {sodaOptions.map(s => (
              <label key={s} className="radio-row">
                <input type="radio" name="soda" checked={soda === s} onChange={() => setSoda(s)} />
                <span style={{ flex: 1 }}>{s}</span>
              </label>
            ))}
          </div>

          <div style={{ borderTop: '2px solid #C41E3A', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 12, color: '#666' }}>Total</div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 26, fontWeight: 700, color: '#C41E3A' }}>${(item.price + extraPrice + getBurgerExtraPrice()).toFixed(2)}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="button" className="btn-outline" onClick={onClose}>Cancel</button>
              <button type="button" className="btn-red" onClick={() => onAdd({ name: `#${item.num} ${item.name}`, price: item.price + extraPrice + getBurgerExtraPrice(), mods: getMods() })} disabled={!canAdd()}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ TWO LARGE PIZZA CUSTOMIZER ============
function TwoLargePizzaCustomizer({ item, pizzaToppings, onClose, onAdd }) {
  const [pizza1Toppings, setPizza1Toppings] = useState([]);
  const [pizza2Toppings, setPizza2Toppings] = useState([]);
  const toppingPrice = 3;

  const availableToppings = ['Pepperoni (Pork)', 'Pepperoni (Beef)', 'Mushroom', 'Sausage', 'Ham', 'Onion', 'Green Peppers', 'Black Olives', 'Bacon', 'Ground Beef', 'Anchovies'];

  const toggleTopping = (pizza, topping) => {
    if (pizza === 1) {
      setPizza1Toppings(prev => prev.includes(topping) ? prev.filter(t => t !== topping) : [...prev, topping]);
    } else {
      setPizza2Toppings(prev => prev.includes(topping) ? prev.filter(t => t !== topping) : [...prev, topping]);
    }
  };

  const getExtraCost = () => {
    return (pizza1Toppings.length + pizza2Toppings.length) * toppingPrice;
  };

  const getMods = () => {
    const mods = [];
    if (pizza1Toppings.length > 0) {
      mods.push('Pizza 1: ' + pizza1Toppings.join(', '));
    } else {
      mods.push('Pizza 1: Plain');
    }
    if (pizza2Toppings.length > 0) {
      mods.push('Pizza 2: ' + pizza2Toppings.join(', '));
    } else {
      mods.push('Pizza 2: Plain');
    }
    return mods;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="red-banner">Customize {item.name}</div>
        <div style={{ padding: 16 }}>
          
          <div style={{ background: '#FFF8DC', border: '1px solid #DAA520', padding: 10, marginBottom: 16, fontSize: 13, color: '#8B4513' }}>
            Two 14" Large Plain Pizzas • Add toppings for +${toppingPrice} each
          </div>

          {/* Pizza 1 Toppings */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>
              PIZZA 1 TOPPINGS <span style={{ fontWeight: 400, fontSize: 12 }}>(+${toppingPrice} each)</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 4 }}>
              {availableToppings.map(t => (
                <label key={t} className="checkbox-row" style={{ padding: '6px 8px' }}>
                  <input type="checkbox" checked={pizza1Toppings.includes(t)} onChange={() => toggleTopping(1, t)} />
                  <span style={{ flex: 1, fontSize: 13 }}>{t}</span>
                </label>
              ))}
            </div>
            {pizza1Toppings.length > 0 && (
              <div style={{ fontSize: 12, color: '#228B22', marginTop: 4 }}>Selected: {pizza1Toppings.join(', ')}</div>
            )}
          </div>

          {/* Pizza 2 Toppings */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>
              PIZZA 2 TOPPINGS <span style={{ fontWeight: 400, fontSize: 12 }}>(+${toppingPrice} each)</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 4 }}>
              {availableToppings.map(t => (
                <label key={t} className="checkbox-row" style={{ padding: '6px 8px' }}>
                  <input type="checkbox" checked={pizza2Toppings.includes(t)} onChange={() => toggleTopping(2, t)} />
                  <span style={{ flex: 1, fontSize: 13 }}>{t}</span>
                </label>
              ))}
            </div>
            {pizza2Toppings.length > 0 && (
              <div style={{ fontSize: 12, color: '#228B22', marginTop: 4 }}>Selected: {pizza2Toppings.join(', ')}</div>
            )}
          </div>

          <div style={{ borderTop: '2px solid #C41E3A', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 12, color: '#666' }}>Total ({pizza1Toppings.length + pizza2Toppings.length} toppings)</div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 26, fontWeight: 700, color: '#C41E3A' }}>${(item.price + getExtraCost()).toFixed(2)}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="button" className="btn-outline" onClick={onClose}>Cancel</button>
              <button type="button" className="btn-red" onClick={() => onAdd({ name: item.name, price: item.price + getExtraCost(), mods: getMods() })}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ STROMBOLI MENU ============
function StromboliMenu({ stromboliMenu, onAddToCart }) {
  const [customizing, setCustomizing] = useState(null);

  return (
    <div className="menu-section">
      <div className="green-stripe" />
      <div className="red-banner">Strombolis</div>
      <div className="menu-section-content">
        <div style={{ fontSize: 12, color: '#666', fontStyle: 'italic', marginBottom: 12 }}>
          Small or Large • Green Peppers, Mushrooms, Grilled Onions available FREE • Extra Topping: Sm +$3 / Lg +$4
        </div>
        {stromboliMenu.items.map((item, i) => (
          <div key={i} className="menu-item" style={{ alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <span className="item-name">{item.name}</span>
              {item.desc && <div className="item-desc">{item.desc}</div>}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className="item-price">${item.prices.small} / ${item.prices.large}</span>
              <button type="button"
                className="add-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setCustomizing(item);
                }}
              >
                + ADD
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Stromboli Customizer Modal */}
      {customizing && (
        <StromboliCustomizer
          item={customizing}
          extraToppingPrices={stromboliMenu.extraTopping}
          onClose={() => setCustomizing(null)}
          onAdd={(item) => { onAddToCart(item); setCustomizing(null); }}
        />
      )}
    </div>
  );
}

// ============ STROMBOLI CUSTOMIZER ============
function StromboliCustomizer({ item, extraToppingPrices, onClose, onAdd }) {
  const [size, setSize] = useState('small');
  const [freeAddons, setFreeAddons] = useState([]);
  const [extraCheese, setExtraCheese] = useState(false);

  const freeAddonOptions = [
    { id: 'green-peppers', name: 'Green Peppers' },
    { id: 'mushrooms', name: 'Mushrooms' },
    { id: 'grilled-onions', name: 'Grilled Onions' },
  ];

  const toggleFreeAddon = (id) => {
    setFreeAddons(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const getPrice = () => {
    let total = item.prices[size];
    if (extraCheese) {
      total += extraToppingPrices[size] || 3;
    }
    return total;
  };

  const getMods = () => {
    const mods = [];
    freeAddons.forEach(id => {
      const opt = freeAddonOptions.find(o => o.id === id);
      if (opt) mods.push(opt.name);
    });
    if (extraCheese) mods.push('Extra Cheese');
    return mods;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="red-banner">Customize {item.name}</div>
        <div style={{ padding: 16 }}>
          
          {item.desc && (
            <div style={{ background: '#FFF8DC', border: '1px solid #DAA520', padding: 10, marginBottom: 16, fontSize: 13, color: '#8B4513' }}>
              <strong>Includes:</strong> {item.desc}
            </div>
          )}

          {/* Size Selection */}
          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>SELECT SIZE</div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <button type="button" className={`size-btn ${size === 'small' ? 'selected' : ''}`} onClick={() => setSize('small')} style={{ flex: 1 }}>
                  <div style={{ fontSize: 13 }}>Small</div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>${item.prices.small}</div>
                </button>
                <button type="button" className={`size-btn ${size === 'large' ? 'selected' : ''}`} onClick={() => setSize('large')} style={{ flex: 1 }}>
                  <div style={{ fontSize: 13 }}>Large</div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>${item.prices.large}</div>
                </button>
              </div>

          {/* Free Add-ons */}
          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>
            FREE ADD-ONS
          </div>
          <div style={{ marginBottom: 16 }}>
            {freeAddonOptions.map(opt => (
              <label key={opt.id} className="checkbox-row">
                <input type="checkbox" checked={freeAddons.includes(opt.id)} onChange={() => toggleFreeAddon(opt.id)} />
                <span style={{ flex: 1 }}>{opt.name}</span>
                <span style={{ color: '#228B22', fontWeight: 600 }}>FREE</span>
              </label>
            ))}
          </div>

          {/* Extra Cheese */}
          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>
            EXTRAS
          </div>
          <div style={{ marginBottom: 16 }}>
            <label className="checkbox-row">
              <input type="checkbox" checked={extraCheese} onChange={() => setExtraCheese(!extraCheese)} />
              <span style={{ flex: 1 }}>Extra Cheese</span>
              <span style={{ color: '#C41E3A', fontWeight: 600 }}>+${extraToppingPrices[size] || 3}</span>
            </label>
          </div>

          <div style={{ borderTop: '2px solid #C41E3A', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 12, color: '#666' }}>Total</div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 26, fontWeight: 700, color: '#C41E3A' }}>${getPrice().toFixed(2)}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="button" className="btn-outline" onClick={onClose}>Cancel</button>
              <button type="button" className="btn-red" onClick={() => onAdd({
                name: `${item.name} (${size === 'small' ? 'Small' : 'Large'})`,
                price: getPrice(),
                mods: getMods()
              })}>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ SALADS MENU ============
function SaladsMenu({ items, onAddToCart }) {
  const [customizing, setCustomizing] = useState(null);

  return (
    <div className="menu-section">
      <div className="green-stripe" />
      <div className="red-banner">Salads</div>
      <div className="menu-section-content">
        <div style={{ fontSize: 12, color: '#666', fontStyle: 'italic', marginBottom: 12 }}>
          All salads available in Small or Large • Extra Meat or Cheese +$3
        </div>
        {items.map((item, i) => (
          <div key={i} className="menu-item" style={{ alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <span className="item-name">{item.name}</span>
              {item.desc && <div className="item-desc">{item.desc}</div>}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className="item-price">${item.prices.small} - ${item.prices.large}</span>
              <button type="button"
                className="add-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setCustomizing(item);
                }}
              >
                + ADD
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Salad Customizer Modal */}
      {customizing && (
        <SaladCustomizer
          item={customizing}
          onClose={() => setCustomizing(null)}
          onAdd={(item) => { onAddToCart(item); setCustomizing(null); }}
        />
      )}
    </div>
  );
}

// ============ SALAD CUSTOMIZER ============
function SaladCustomizer({ item, onClose, onAdd }) {
  const [size, setSize] = useState('large');
  const [includedIngredients, setIncludedIngredients] = useState(item.ingredients || []);
  const [dressing, setDressing] = useState(item.defaultDressing || '');
  const [dressingQty, setDressingQty] = useState(1);
  const [extras, setExtras] = useState([]);

  // All possible ingredients with display names
  const ingredientNames = {
    'iceberg-lettuce': 'Iceberg Lettuce',
    'romaine-lettuce': 'Romaine Lettuce',
    'tomatoes': 'Tomatoes',
    'onions': 'Onions',
    'green-peppers': 'Green Peppers',
    'egg': 'Egg',
    'olives': 'Olives',
    'cucumbers': 'Cucumbers',
    'croutons': 'Croutons',
    'parmesan': 'Parmesan Cheese',
    'grilled-chicken': 'Grilled Chicken',
    'chicken-tenders': 'Chicken Tenders',
    'ham': 'Ham',
    'turkey': 'Turkey',
    'american-cheese': 'American Cheese',
    'provolone': 'Provolone Cheese',
    'genoa-salami': 'Genoa Salami',
    'pepperoni': 'Pepperoni',
    'tuna': 'Tuna',
    'flounder': 'Fried Flounder',
    'feta-cheese': 'Feta Cheese',
    'pepperoncini': 'Pepperoncini',
  };

  const dressings = [
    { id: 'french', name: 'French' },
    { id: 'russian', name: 'Russian' },
    { id: 'caesar', name: 'Caesar' },
    { id: 'blue-cheese', name: 'Blue Cheese' },
    { id: 'ranch', name: 'Ranch' },
    { id: 'italian', name: 'Italian' },
    { id: 'oil-vinegar', name: 'Oil & Vinegar' },
    { id: 'none', name: 'No Dressing' },
  ];

  const extraOptions = [
    { id: 'extra-meat', name: 'Extra Meat', price: 3 },
    { id: 'extra-cheese', name: 'Extra Cheese', price: 3 },
  ];

  const toggleIngredient = (id) => {
    setIncludedIngredients(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleExtra = (id) => {
    setExtras(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const getPrice = () => {
    let total = item.prices[size];
    extras.forEach(id => {
      const opt = extraOptions.find(o => o.id === id);
      if (opt) total += opt.price;
    });
    // Extra dressing costs
    if (dressingQty > 1) {
      total += (dressingQty - 1) * 0.50;
    }
    return total;
  };

  const getMods = () => {
    const mods = [];
    
    // Find removed ingredients
    const removed = (item.ingredients || []).filter(ing => !includedIngredients.includes(ing));
    if (removed.length > 0) {
      mods.push('NO: ' + removed.map(id => ingredientNames[id] || id).join(', '));
    }
    
    // Dressing
    if (dressing && dressing !== 'none') {
      const dressingName = dressings.find(d => d.id === dressing)?.name || dressing;
      if (dressingQty > 1) {
        mods.push(`${dressingName} Dressing (x${dressingQty})`);
      } else {
        mods.push(`${dressingName} Dressing`);
      }
    } else if (dressing === 'none') {
      mods.push('No Dressing');
    }
    
    // Extras
    extras.forEach(id => {
      const opt = extraOptions.find(o => o.id === id);
      if (opt) mods.push(opt.name);
    });
    
    return mods;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        <div className="red-banner">Customize {item.name}</div>
        <div style={{ padding: 16 }}>
          
          {item.desc && (
            <div style={{ background: '#FFF8DC', border: '1px solid #DAA520', padding: 10, marginBottom: 16, fontSize: 13, color: '#8B4513' }}>
              <strong>Includes:</strong> {item.desc}
            </div>
          )}

          {/* Size Selection */}
          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>SELECT SIZE</div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <button type="button" className={`size-btn ${size === 'small' ? 'selected' : ''}`} onClick={() => setSize('small')} style={{ flex: 1 }}>
              <div style={{ fontSize: 13 }}>Small</div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>${item.prices.small}</div>
            </button>
            <button type="button" className={`size-btn ${size === 'large' ? 'selected' : ''}`} onClick={() => setSize('large')} style={{ flex: 1 }}>
              <div style={{ fontSize: 13 }}>Large</div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>${item.prices.large}</div>
            </button>
          </div>

          {/* Ingredients - Pre-checked based on salad type */}
          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>
            INGREDIENTS <span style={{ fontWeight: 400, fontSize: 12 }}>(uncheck to remove)</span>
          </div>
          <div style={{ marginBottom: 16, maxHeight: 150, overflowY: 'auto', border: '1px solid #ddd', padding: 8, background: 'white' }}>
            {(item.ingredients || []).map(ingId => (
              <label key={ingId} className="checkbox-row">
                <input 
                  type="checkbox" 
                  checked={includedIngredients.includes(ingId)} 
                  onChange={() => toggleIngredient(ingId)} 
                />
                <span style={{ flex: 1, textDecoration: includedIngredients.includes(ingId) ? 'none' : 'line-through', color: includedIngredients.includes(ingId) ? 'inherit' : '#999' }}>
                  {ingredientNames[ingId] || ingId}
                </span>
                <span style={{ color: '#228B22', fontWeight: 600, fontSize: 11 }}>INCLUDED</span>
              </label>
            ))}
          </div>

          {/* Dressing Selection */}
          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>
            DRESSING {item.isCaesar && <span style={{ fontWeight: 400, fontSize: 11, color: '#C41E3A' }}>(Caesar included)</span>}
          </div>
          <div style={{ marginBottom: 8 }}>
            <select 
              value={dressing} 
              onChange={(e) => setDressing(e.target.value)}
              style={{ width: '100%', padding: 10, fontSize: 14, border: '2px solid #ddd' }}
            >
              <option value="">-- Select Dressing --</option>
              {dressings.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>
          
          {/* Dressing Quantity */}
          {dressing && dressing !== 'none' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, padding: 8, background: '#f5f5f5' }}>
              <span style={{ fontSize: 13 }}>Dressing Quantity:</span>
              <button type="button" 
                onClick={() => setDressingQty(Math.max(1, dressingQty - 1))}
                style={{ width: 30, height: 30, border: '1px solid #ddd', background: 'white', cursor: 'pointer', fontSize: 16 }}
              >−</button>
              <span style={{ fontWeight: 600, minWidth: 20, textAlign: 'center' }}>{dressingQty}</span>
              <button type="button"
                onClick={() => setDressingQty(dressingQty + 1)}
                style={{ width: 30, height: 30, border: '1px solid #ddd', background: 'white', cursor: 'pointer', fontSize: 16 }}
              >+</button>
              {dressingQty > 1 && <span style={{ fontSize: 11, color: '#C41E3A' }}>+${((dressingQty - 1) * 0.50).toFixed(2)}</span>}
            </div>
          )}

          {/* Extras */}
          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>EXTRAS</div>
          <div style={{ marginBottom: 16 }}>
            {extraOptions.map(opt => (
              <label key={opt.id} className="checkbox-row">
                <input type="checkbox" checked={extras.includes(opt.id)} onChange={() => toggleExtra(opt.id)} />
                <span style={{ flex: 1 }}>{opt.name}</span>
                <span style={{ color: '#C41E3A', fontWeight: 600 }}>+${opt.price}</span>
              </label>
            ))}
          </div>

          <div style={{ borderTop: '2px solid #C41E3A', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 12, color: '#666' }}>Total</div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 26, fontWeight: 700, color: '#C41E3A' }}>${getPrice().toFixed(2)}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="button" className="btn-outline" onClick={onClose}>Cancel</button>
              <button type="button" 
                className="btn-red" 
                disabled={!dressing}
                onClick={() => onAdd({
                  name: `${item.name} (${size === 'small' ? 'Small' : 'Large'})`,
                  price: getPrice(),
                  mods: getMods()
                })}
              >
                {!dressing ? 'Select Dressing' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ CALIFORNIA BURGER PLATTER CUSTOMIZER ============
function CaliforniaBurgerCustomizer({ item, onClose, onAdd }) {
  const [burgerAddons, setBurgerAddons] = useState([]);
  const [friesOptions, setFriesOptions] = useState([]);

  const burgerOpts = [
    { id: 'lettuce', name: 'Lettuce', price: 0 },
    { id: 'tomato', name: 'Tomato', price: 0 },
    { id: 'onion', name: 'Onion', price: 0 },
    { id: 'pickles', name: 'Pickles', price: 0 },
    { id: 'extra-cheese', name: 'Extra Cheese', price: 1 },
    { id: 'bacon', name: 'Bacon', price: 2 },
    { id: 'extra-patty', name: 'Extra Burger Patty', price: 2 },
    { id: 'salt', name: 'Salt', price: 0 },
    { id: 'pepper', name: 'Pepper', price: 0 },
    { id: 'mayo', name: 'Mayo', price: 0 },
    { id: 'ketchup', name: 'Ketchup', price: 0 },
    { id: 'mustard', name: 'Mustard', price: 0 },
  ];

  const friesOpts = [
    { id: 'fries-salt', name: 'Salt on Fries', price: 0 },
    { id: 'fries-pepper', name: 'Pepper on Fries', price: 0 },
    { id: 'fries-ketchup', name: 'Ketchup on Fries', price: 0 },
    { id: 'cheese-whiz', name: 'Cheese Whiz on Fries', price: 2 },
    { id: 'extra-crispy', name: 'Extra Crispy Fries', price: 0 },
  ];

  const toggle = (arr, setArr, id) => setArr(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const getPrice = () => {
    let total = item.price;
    burgerAddons.forEach(id => { const a = burgerOpts.find(x => x.id === id); if (a) total += a.price; });
    friesOptions.forEach(id => { const f = friesOpts.find(x => x.id === id); if (f) total += f.price; });
    return total;
  };

  const getMods = () => {
    const mods = ['With Fries'];
    burgerAddons.forEach(id => { const a = burgerOpts.find(x => x.id === id); if (a) mods.push(a.name); });
    friesOptions.forEach(id => { const f = friesOpts.find(x => x.id === id); if (f) mods.push(f.name); });
    return mods;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="red-banner">Customize California Burger Platter</div>
        <div style={{ padding: 16 }}>
          
          <div style={{ background: '#FFF8DC', border: '1px solid #DAA520', padding: 10, marginBottom: 16, fontSize: 13, color: '#8B4513' }}>
            <strong>Includes:</strong> Burger + French Fries
          </div>

          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>BURGER TOPPINGS</div>
          <div style={{ marginBottom: 16, maxHeight: 180, overflowY: 'auto', border: '1px solid #ddd', padding: 8, background: 'white' }}>
            {burgerOpts.map(a => (
              <label key={a.id} className="checkbox-row">
                <input type="checkbox" checked={burgerAddons.includes(a.id)} onChange={() => toggle(burgerAddons, setBurgerAddons, a.id)} />
                <span style={{ flex: 1 }}>{a.name}</span>
                <span style={{ color: a.price > 0 ? '#C41E3A' : '#228B22', fontWeight: 600 }}>{a.price > 0 ? `+$${a.price}` : 'FREE'}</span>
              </label>
            ))}
          </div>

          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>FRIES OPTIONS</div>
          <div style={{ marginBottom: 16 }}>
            {friesOpts.map(f => (
              <label key={f.id} className="checkbox-row">
                <input type="checkbox" checked={friesOptions.includes(f.id)} onChange={() => toggle(friesOptions, setFriesOptions, f.id)} />
                <span style={{ flex: 1 }}>{f.name}</span>
                <span style={{ color: f.price > 0 ? '#C41E3A' : '#228B22', fontWeight: 600 }}>{f.price > 0 ? `+$${f.price}` : 'FREE'}</span>
              </label>
            ))}
          </div>

          <div style={{ borderTop: '2px solid #C41E3A', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 12, color: '#666' }}>Total</div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 26, fontWeight: 700, color: '#C41E3A' }}>${getPrice().toFixed(2)}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="button" className="btn-outline" onClick={onClose}>Cancel</button>
              <button type="button" className="btn-red" onClick={() => onAdd({ name: item.name, price: getPrice(), mods: getMods() })}>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ SEAFOOD PLATTER CUSTOMIZER ============
function SeafoodPlatterCustomizer({ item, onClose, onAdd }) {
  // Fries options - separate checkboxes
  const [friesSalt, setFriesSalt] = useState(false);
  const [friesPepper, setFriesPepper] = useState(false);
  const [friesKetchup, setFriesKetchup] = useState(false);
  // Other options
  const [extraTartar, setExtraTartar] = useState(false);
  const [noColeSlaw, setNoColeSlaw] = useState(false);

  const getMods = () => {
    const mods = [];
    // Fries options
    const friesOpts = [];
    if (friesSalt) friesOpts.push('Salt');
    if (friesPepper) friesOpts.push('Pepper');
    if (friesKetchup) friesOpts.push('Ketchup');
    if (friesOpts.length > 0) {
      mods.push('Fries: ' + friesOpts.join(', '));
    } else {
      mods.push('Fries: Plain');
    }
    // Other options
    if (extraTartar) mods.push('Extra Tartar Sauce');
    if (noColeSlaw) mods.push('No Cole Slaw');
    return mods;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="red-banner">{item.name}</div>
        <div style={{ padding: 16 }}>
          
          <div style={{ background: '#FFF8DC', border: '1px solid #DAA520', padding: 10, marginBottom: 16, fontSize: 13, color: '#8B4513' }}>
            <strong>Includes:</strong> French Fries, Cole Slaw, Tartar Sauce, Roll & Butter
          </div>

          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>
            FRIES OPTIONS
          </div>
          
          <label className="checkbox-row">
            <input type="checkbox" checked={friesSalt} onChange={() => setFriesSalt(!friesSalt)} />
            <span style={{ flex: 1 }}>Salt</span>
            <span style={{ color: '#228B22', fontWeight: 600 }}>FREE</span>
          </label>
          
          <label className="checkbox-row">
            <input type="checkbox" checked={friesPepper} onChange={() => setFriesPepper(!friesPepper)} />
            <span style={{ flex: 1 }}>Pepper</span>
            <span style={{ color: '#228B22', fontWeight: 600 }}>FREE</span>
          </label>
          
          <label className="checkbox-row">
            <input type="checkbox" checked={friesKetchup} onChange={() => setFriesKetchup(!friesKetchup)} />
            <span style={{ flex: 1 }}>Ketchup</span>
            <span style={{ color: '#228B22', fontWeight: 600 }}>FREE</span>
          </label>

          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, marginTop: 16, color: '#666' }}>
            PLATTER OPTIONS
          </div>
          
          <label className="checkbox-row">
            <input type="checkbox" checked={extraTartar} onChange={() => setExtraTartar(!extraTartar)} />
            <span style={{ flex: 1 }}>Extra Tartar Sauce</span>
            <span style={{ color: '#228B22', fontWeight: 600 }}>FREE</span>
          </label>
          
          <label className="checkbox-row">
            <input type="checkbox" checked={noColeSlaw} onChange={() => setNoColeSlaw(!noColeSlaw)} />
            <span style={{ flex: 1 }}>No Cole Slaw</span>
            <span style={{ color: '#228B22', fontWeight: 600 }}>FREE</span>
          </label>

          <div style={{ borderTop: '2px solid #C41E3A', paddingTop: 12, marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 12, color: '#666' }}>Total</div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 26, fontWeight: 700, color: '#C41E3A' }}>${item.price.toFixed(2)}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="button" className="btn-outline" onClick={onClose}>Cancel</button>
              <button type="button" className="btn-red" onClick={() => onAdd({ name: item.name, price: item.price, mods: getMods() })}>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ PIZZA CUSTOMIZER ============
function PizzaCustomizer({ item, onClose, onAdd }) {
  const [size, setSize] = useState('large');
  const [extraToppings, setExtraToppings] = useState([]);
  const [pepperoniType, setPepperoniType] = useState('pork');
  const [cookingPref, setCookingPref] = useState('regular');

  const toppings = ['Pepperoni', 'Mushroom', 'Sausage', 'Ham', 'Onion', 'Green Peppers', 'Black Olives', 'Bacon', 'Anchovies', 'Extra Cheese', 'Ricotta Cheese'];

  const toggleTopping = (t) => setExtraToppings(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

  const getPrice = () => item.prices[size] + (extraToppings.length * 3);

  const getMods = () => {
    const mods = [];
    if (cookingPref !== 'regular') {
      mods.push(cookingPref === 'light' ? 'Light (Less Cooked)' : 'Well Done');
    }
    if (item.hasPepperoniChoice) {
      mods.push(pepperoniType === 'beef' ? 'Beef Pepperoni' : 'Pork Pepperoni');
    }
    if (extraToppings.length > 0) {
      mods.push(`+ ${extraToppings.join(', ')}`);
    }
    return mods;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="red-banner">{item.name} Pizza</div>
        <div style={{ padding: 16, maxHeight: '75vh', overflowY: 'auto' }}>
          
          {/* Item Description */}
          {item.desc && (
            <div style={{ 
              background: '#FFF8DC', 
              border: '1px solid #DAA520', 
              padding: 10, 
              marginBottom: 16, 
              fontSize: 13,
              color: '#8B4513'
            }}>
              <strong>Includes:</strong> {item.desc}
            </div>
          )}

          {/* Pepperoni Choice */}
          {item.hasPepperoniChoice && (
            <>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>PEPPERONI TYPE</div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <button type="button"
                  className={`size-btn ${pepperoniType === 'pork' ? 'selected' : ''}`}
                  onClick={() => setPepperoniType('pork')}
                  style={{ flex: 1 }}
                >
                  <div style={{ fontSize: 14 }}>🐷 Pork</div>
                  <div style={{ fontSize: 11, opacity: 0.8 }}>Traditional</div>
                </button>
                <button type="button"
                  className={`size-btn ${pepperoniType === 'beef' ? 'selected' : ''}`}
                  onClick={() => setPepperoniType('beef')}
                  style={{ flex: 1 }}
                >
                  <div style={{ fontSize: 14 }}>🐮 Beef</div>
                  <div style={{ fontSize: 11, opacity: 0.8 }}>Halal Option</div>
                </button>
              </div>
            </>
          )}

          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>SELECT SIZE</div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {[
              { key: 'small', label: 'Small 10"', price: item.prices.small },
              { key: 'large', label: 'Large 14"', price: item.prices.large },
              { key: 'xlarge', label: 'X-Large 16"', price: item.prices.xlarge },
            ].map(s => (
              <button key={s.key} className={`size-btn ${size === s.key ? 'selected' : ''}`} onClick={() => setSize(s.key)}>
                <div style={{ fontSize: 13 }}>{s.label}</div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>${s.price}</div>
              </button>
            ))}
          </div>

          {/* Cooking Preference */}
          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>COOKING PREFERENCE</div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {[
              { key: 'light', label: 'Light', desc: 'Less cooked' },
              { key: 'regular', label: 'Regular', desc: 'Standard' },
              { key: 'well', label: 'Well Done', desc: 'Extra crispy' },
            ].map(c => (
              <button key={c.key} className={`size-btn ${cookingPref === c.key ? 'selected' : ''}`} onClick={() => setCookingPref(c.key)} style={{ flex: 1 }}>
                <div style={{ fontSize: 13 }}>{c.label}</div>
                <div style={{ fontSize: 10, opacity: 0.8 }}>{c.desc}</div>
              </button>
            ))}
          </div>

          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>ADD EXTRA TOPPINGS (+$3 each)</div>
          <div style={{ maxHeight: 180, overflowY: 'auto', border: '1px solid #ddd', padding: 8, background: 'white' }}>
            {toppings.map(t => (
              <label key={t} className="checkbox-row">
                <input type="checkbox" checked={extraToppings.includes(t)} onChange={() => toggleTopping(t)} />
                <span style={{ flex: 1 }}>{t}</span>
                <span style={{ color: '#C41E3A', fontWeight: 600 }}>+$3</span>
              </label>
            ))}
          </div>

          <div style={{ borderTop: '2px solid #C41E3A', marginTop: 16, paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 12, color: '#666' }}>Total</div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 26, fontWeight: 700, color: '#C41E3A' }}>${getPrice().toFixed(2)}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="button" className="btn-outline" onClick={onClose}>Cancel</button>
              <button type="button" className="btn-red" onClick={() => onAdd({
                name: `${item.name} Pizza (${size === 'xlarge' ? 'X-Large' : size.charAt(0).toUpperCase() + size.slice(1)})`,
                price: getPrice(),
                mods: getMods()
              })}>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ HALF & HALF PIZZA CUSTOMIZER ============
function HalfHalfPizzaCustomizer({ pizzaMenu, whitePizzaMenu, onClose, onAdd }) {
  const [size, setSize] = useState('large');
  const [half1, setHalf1] = useState('Plain');
  const [half2, setHalf2] = useState('Pepperoni');
  const [pepperoniType, setPepperoniType] = useState('pork');

  // Combine all pizza options with prices
  const allPizzas = [
    ...pizzaMenu.classic.map(p => ({ ...p, category: 'Classic' })),
    ...pizzaMenu.specialty.map(p => ({ ...p, category: 'Specialty' })),
    ...whitePizzaMenu.items.map(p => ({ ...p, category: 'White' })),
  ];

  // Get price for a pizza by name and size
  const getPizzaPrice = (name, sizeKey) => {
    const pizza = allPizzas.find(p => p.name === name);
    return pizza ? pizza.prices[sizeKey] : 0;
  };

  // Price is the more expensive half
  const getPrice = () => {
    const price1 = getPizzaPrice(half1, size);
    const price2 = getPizzaPrice(half2, size);
    return Math.max(price1, price2);
  };

  const needsPepperoniChoice = () => {
    const pepperoniItems = ['Pepperoni', "George's Special", 'Meat Lover'];
    return pepperoniItems.includes(half1) || pepperoniItems.includes(half2);
  };

  const getMods = () => {
    const mods = [];
    if (needsPepperoniChoice()) {
      mods.push(pepperoniType === 'beef' ? 'Beef Pepperoni' : 'Pork Pepperoni');
    }
    return mods;
  };

  // Get the more expensive pizza name for display
  const getMoreExpensivePizza = () => {
    const price1 = getPizzaPrice(half1, size);
    const price2 = getPizzaPrice(half2, size);
    return price1 >= price2 ? half1 : half2;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="red-banner">🍕 Build Half & Half Pizza</div>
        <div style={{ padding: 16 }}>
          
          <div style={{ background: '#FFF8DC', border: '1px solid #DAA520', padding: 10, marginBottom: 16, fontSize: 13, color: '#8B4513' }}>
            <strong>How it works:</strong> Choose a different topping for each half. Price is based on the more expensive half. Available in Large & X-Large only.
          </div>

          {/* Size Selection - Large and X-Large only */}
          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>SELECT SIZE</div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {[
              { key: 'large', label: 'Large 14"' },
              { key: 'xlarge', label: 'X-Large 16"' },
            ].map(s => (
              <button type="button" key={s.key} className={`size-btn ${size === s.key ? 'selected' : ''}`} onClick={() => setSize(s.key)} style={{ flex: 1 }}>
                <div style={{ fontSize: 13 }}>{s.label}</div>
              </button>
            ))}
          </div>

          {/* Half 1 Selection */}
          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#C41E3A' }}>FIRST HALF</div>
          <select 
            value={half1} 
            onChange={(e) => setHalf1(e.target.value)}
            style={{ width: '100%', padding: 10, fontSize: 14, marginBottom: 16, border: '2px solid #ddd' }}
          >
            <optgroup label="Classic">
              {pizzaMenu.classic.map(p => <option key={p.name} value={p.name}>{p.name} (${p.prices[size]})</option>)}
            </optgroup>
            <optgroup label="Specialty">
              {pizzaMenu.specialty.map(p => <option key={p.name} value={p.name}>{p.name} (${p.prices[size]})</option>)}
            </optgroup>
            <optgroup label="White Pizza">
              {whitePizzaMenu.items.map(p => <option key={p.name} value={p.name}>{p.name} (${p.prices[size]})</option>)}
            </optgroup>
          </select>

          {/* Half 2 Selection */}
          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#C41E3A' }}>SECOND HALF</div>
          <select 
            value={half2} 
            onChange={(e) => setHalf2(e.target.value)}
            style={{ width: '100%', padding: 10, fontSize: 14, marginBottom: 16, border: '2px solid #ddd' }}
          >
            <optgroup label="Classic">
              {pizzaMenu.classic.map(p => <option key={p.name} value={p.name}>{p.name} (${p.prices[size]})</option>)}
            </optgroup>
            <optgroup label="Specialty">
              {pizzaMenu.specialty.map(p => <option key={p.name} value={p.name}>{p.name} (${p.prices[size]})</option>)}
            </optgroup>
            <optgroup label="White Pizza">
              {whitePizzaMenu.items.map(p => <option key={p.name} value={p.name}>{p.name} (${p.prices[size]})</option>)}
            </optgroup>
          </select>

          {/* Pepperoni Type if needed */}
          {needsPepperoniChoice() && (
            <>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>PEPPERONI TYPE</div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <button type="button"
                  className={`size-btn ${pepperoniType === 'pork' ? 'selected' : ''}`}
                  onClick={() => setPepperoniType('pork')}
                  style={{ flex: 1 }}
                >
                  <div style={{ fontSize: 14 }}>🐷 Pork</div>
                  <div style={{ fontSize: 11, opacity: 0.8 }}>Traditional</div>
                </button>
                <button type="button"
                  className={`size-btn ${pepperoniType === 'beef' ? 'selected' : ''}`}
                  onClick={() => setPepperoniType('beef')}
                  style={{ flex: 1 }}
                >
                  <div style={{ fontSize: 14 }}>🐮 Beef</div>
                  <div style={{ fontSize: 11, opacity: 0.8 }}>Halal Option</div>
                </button>
              </div>
            </>
          )}

          {/* Preview */}
          <div style={{ background: '#f5f5f5', padding: 12, marginBottom: 16, borderRadius: 4 }}>
            <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>Your Pizza:</div>
            <div style={{ fontWeight: 600, fontSize: 15 }}>
              Half {half1} / Half {half2}
            </div>
            <div style={{ fontSize: 11, color: '#888', marginTop: 4 }}>
              Priced as {size === 'xlarge' ? 'X-Large' : 'Large'} {getMoreExpensivePizza()}
            </div>
          </div>

          <div style={{ borderTop: '2px solid #C41E3A', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 12, color: '#666' }}>Total</div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 26, fontWeight: 700, color: '#C41E3A' }}>${getPrice().toFixed(2)}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="button" className="btn-outline" onClick={onClose}>Cancel</button>
              <button type="button" className="btn-red" onClick={() => onAdd({
                name: `Half & Half Pizza (${size === 'xlarge' ? 'X-Large' : 'Large'})`,
                price: getPrice(),
                mods: [`Half ${half1} / Half ${half2}`, ...getMods()]
              })}>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ STEAK CUSTOMIZER ============
function SteakCustomizer({ item, onClose, onAdd }) {
  const [cheese, setCheese] = useState('american');
  const [addons, setAddons] = useState([]);
  const [extras, setExtras] = useState([]);

  const cheeseOpts = [
    { id: 'american', name: 'American' },
    { id: 'provolone', name: 'Provolone' },
    { id: 'whiz', name: 'Cheese Whiz' },
    { id: 'none', name: 'No Cheese' },
  ];

  const addonOpts = [
    { id: 'fried-onions', name: 'Fried Onions', price: 0 },
    { id: 'green-peppers', name: 'Green Peppers', price: 2 },
    { id: 'mushrooms', name: 'Mushrooms', price: 2 },
    { id: 'bacon', name: 'Bacon', price: 2 },
    { id: 'hot-peppers', name: 'Hot Peppers', price: 0 },
    { id: 'sweet-peppers', name: 'Sweet Peppers', price: 0 },
    { id: 'pepperoni', name: 'Pepperoni', price: 2 },
    { id: 'pizza-sauce', name: 'Pizza Sauce', price: 2 },
  ];

  const extraOpts = [
    { id: 'extra-meat', name: 'Extra Meat', price: item.category === 'chicken' ? 1.5 : 3 },
    { id: 'extra-cheese', name: 'Extra Cheese', price: 1 },
  ];

  const toggle = (arr, setArr, id) => setArr(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const getPrice = () => {
    let total = item.price;
    addons.forEach(id => { const a = addonOpts.find(x => x.id === id); if (a) total += a.price; });
    extras.forEach(id => { const e = extraOpts.find(x => x.id === id); if (e) total += e.price; });
    return total;
  };

  const getMods = () => {
    const mods = [];
    if (cheese !== 'none') mods.push(cheeseOpts.find(c => c.id === cheese).name);
    addons.forEach(id => { const a = addonOpts.find(x => x.id === id); if (a) mods.push(a.name); });
    extras.forEach(id => { const e = extraOpts.find(x => x.id === id); if (e) mods.push(e.name); });
    return mods;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="red-banner">Customize {item.name}</div>
        <div style={{ padding: 16 }}>
          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>CHOOSE CHEESE</div>
          <div style={{ marginBottom: 16 }}>
            {cheeseOpts.map(c => (
              <label key={c.id} className="radio-row">
                <input type="radio" name="cheese" checked={cheese === c.id} onChange={() => setCheese(c.id)} />
                <span>{c.name}</span>
              </label>
            ))}
          </div>

          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>ADD-ONS</div>
          <div style={{ marginBottom: 16 }}>
            {addonOpts.map(a => (
              <label key={a.id} className="checkbox-row">
                <input type="checkbox" checked={addons.includes(a.id)} onChange={() => toggle(addons, setAddons, a.id)} />
                <span style={{ flex: 1 }}>{a.name}</span>
                <span style={{ color: a.price > 0 ? '#C41E3A' : '#228B22', fontWeight: 600 }}>{a.price > 0 ? `+$${a.price}` : 'FREE'}</span>
              </label>
            ))}
          </div>

          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>EXTRAS</div>
          <div style={{ marginBottom: 16 }}>
            {extraOpts.map(e => (
              <label key={e.id} className="checkbox-row">
                <input type="checkbox" checked={extras.includes(e.id)} onChange={() => toggle(extras, setExtras, e.id)} />
                <span style={{ flex: 1 }}>{e.name}</span>
                <span style={{ color: '#C41E3A', fontWeight: 600 }}>+${e.price.toFixed(2)}</span>
              </label>
            ))}
          </div>

          <div style={{ borderTop: '2px solid #C41E3A', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 12, color: '#666' }}>Total</div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 26, fontWeight: 700, color: '#C41E3A' }}>${getPrice().toFixed(2)}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="button" className="btn-outline" onClick={onClose}>Cancel</button>
              <button type="button" className="btn-red" onClick={() => onAdd({ name: item.name, price: getPrice(), mods: getMods() })}>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ STEAK PLATTER CUSTOMIZER ============
function SteakPlatterCustomizer({ item, onClose, onAdd }) {
  const [cheese, setCheese] = useState('american');
  const [addons, setAddons] = useState([]);
  const [friesOptions, setFriesOptions] = useState([]);

  const cheeseOpts = [
    { id: 'american', name: 'American' },
    { id: 'provolone', name: 'Provolone' },
    { id: 'whiz', name: 'Cheese Whiz' },
    { id: 'none', name: 'No Cheese' },
  ];

  const addonOpts = [
    { id: 'fried-onions', name: 'Fried Onions', price: 0 },
    { id: 'green-peppers', name: 'Green Peppers', price: 2 },
    { id: 'mushrooms', name: 'Mushrooms', price: 2 },
    { id: 'bacon', name: 'Bacon', price: 2 },
    { id: 'hot-peppers', name: 'Hot Peppers', price: 0 },
    { id: 'sweet-peppers', name: 'Sweet Peppers', price: 0 },
  ];

  const friesOpts = [
    { id: 'fries-salt', name: 'Salt on Fries', price: 0 },
    { id: 'fries-pepper', name: 'Pepper on Fries', price: 0 },
    { id: 'fries-ketchup', name: 'Ketchup on Fries', price: 0 },
    { id: 'cheese-whiz', name: 'Cheese Whiz on Fries', price: 2 },
  ];

  const toggle = (arr, setArr, id) => setArr(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const getPrice = () => {
    let total = item.price;
    addons.forEach(id => { const a = addonOpts.find(x => x.id === id); if (a) total += a.price; });
    friesOptions.forEach(id => { const f = friesOpts.find(x => x.id === id); if (f) total += f.price; });
    return total;
  };

  const getMods = () => {
    const mods = ['With Fries'];
    if (cheese !== 'none') mods.push(cheeseOpts.find(c => c.id === cheese).name);
    addons.forEach(id => { const a = addonOpts.find(x => x.id === id); if (a) mods.push(a.name); });
    friesOptions.forEach(id => { const f = friesOpts.find(x => x.id === id); if (f) mods.push(f.name); });
    return mods;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="red-banner">Customize {item.name}</div>
        <div style={{ padding: 16 }}>
          
          <div style={{ background: '#FFF8DC', border: '1px solid #DAA520', padding: 10, marginBottom: 16, fontSize: 13, color: '#8B4513' }}>
            <strong>Includes:</strong> Cheese Steak + French Fries
          </div>

          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>CHEESE ON STEAK</div>
          <div style={{ marginBottom: 16 }}>
            {cheeseOpts.map(c => (
              <label key={c.id} className="radio-row">
                <input type="radio" name="cheese" checked={cheese === c.id} onChange={() => setCheese(c.id)} />
                <span>{c.name}</span>
              </label>
            ))}
          </div>

          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>STEAK ADD-ONS</div>
          <div style={{ marginBottom: 16 }}>
            {addonOpts.map(a => (
              <label key={a.id} className="checkbox-row">
                <input type="checkbox" checked={addons.includes(a.id)} onChange={() => toggle(addons, setAddons, a.id)} />
                <span style={{ flex: 1 }}>{a.name}</span>
                <span style={{ color: a.price > 0 ? '#C41E3A' : '#228B22', fontWeight: 600 }}>{a.price > 0 ? `+$${a.price}` : 'FREE'}</span>
              </label>
            ))}
          </div>

          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>FRIES OPTIONS</div>
          <div style={{ marginBottom: 16 }}>
            {friesOpts.map(f => (
              <label key={f.id} className="checkbox-row">
                <input type="checkbox" checked={friesOptions.includes(f.id)} onChange={() => toggle(friesOptions, setFriesOptions, f.id)} />
                <span style={{ flex: 1 }}>{f.name}</span>
                <span style={{ color: f.price > 0 ? '#C41E3A' : '#228B22', fontWeight: 600 }}>{f.price > 0 ? `+$${f.price}` : 'FREE'}</span>
              </label>
            ))}
          </div>

          <div style={{ borderTop: '2px solid #C41E3A', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 12, color: '#666' }}>Total</div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 26, fontWeight: 700, color: '#C41E3A' }}>${getPrice().toFixed(2)}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="button" className="btn-outline" onClick={onClose}>Cancel</button>
              <button type="button" className="btn-red" onClick={() => onAdd({ name: item.name, price: getPrice(), mods: getMods() })}>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ CHECKOUT VIEW ============
function CheckoutView({ cart, onRemove, onBack, onNavigateToCategory, orderType, setOrderType, subtotal, customerName, setCustomerName, email, setEmail, phone, setPhone, deliveryAddress, setDeliveryAddress, couponCode, setCouponCode, couponApplied, setCouponApplied, emailConsent, setEmailConsent, deliveryZones, deliveryMinimum, deliveryFee, taxRate, specialInstructions, setSpecialInstructions, driverTip, setDriverTip, storeStatus }) {
  const [processing, setProcessing] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [zipError, setZipError] = useState('');
  const [customTip, setCustomTip] = useState('');
  const [scheduleType, setScheduleType] = useState('asap'); // 'asap' or 'scheduled'
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const estimate = orderType === 'pickup' ? '~15 minutes' : '35-45 minutes';

  // Generate available dates (today + next 3 days)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) { // Look ahead 7 days
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip holidays
      if (isHoliday(date)) continue;
      
      const dayName = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      dates.push({
        value: date.toISOString().split('T')[0],
        label: dayName,
        dayOfWeek: date.getDay(),
        isToday: i === 0
      });
    }
    return dates;
  };

  // Generate available times based on selected date
  const getAvailableTimes = () => {
    if (!scheduledDate) return [];
    const selectedDateInfo = getAvailableDates().find(d => d.value === scheduledDate);
    if (!selectedDateInfo) return [];
    
    const dayOfWeek = selectedDateInfo.dayOfWeek;
    const isToday = selectedDateInfo.isToday;
    const now = new Date();
    
    // Use STORE_HOURS config
    const hours = STORE_HOURS[dayOfWeek];
    const openHour = hours.open;
    const closeHour = hours.close;
    
    const times = [];
    for (let hour = openHour; hour < closeHour; hour++) {
      for (let min = 0; min < 60; min += 30) {
        const timeDate = new Date();
        timeDate.setHours(hour, min, 0, 0);
        
        // For today, require at least 30 minutes from now
        if (isToday) {
          const minTime = new Date(now.getTime() + 30 * 60 * 1000); // 30 minutes from now
          if (timeDate <= minTime) continue;
        }
        
        const timeStr = timeDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
        times.push({
          value: `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`,
          label: timeStr
        });
      }
    }
    return times;
  };

  // Check if delivery minimum is met (based on subtotal before fees/tax)
  const isBelowDeliveryMinimum = orderType === 'delivery' && subtotal < deliveryMinimum;
  const amountNeededForMinimum = deliveryMinimum - subtotal;

  // Calculate delivery fee (only for delivery orders)
  const actualDeliveryFee = orderType === 'delivery' ? deliveryFee : 0;

  // Example coupon codes
  const validCoupons = {
    'WELCOME10': { type: 'percent', value: 10, desc: '10% off' },
    'FREEDELIVERY': { type: 'delivery', value: deliveryFee, desc: 'Free delivery' },
    'GEORGE5': { type: 'flat', value: 5, desc: '$5 off' },
  };

  const applyCoupon = () => {
    const code = couponCode.toUpperCase().trim();
    if (validCoupons[code]) {
      // Check if FREEDELIVERY is used on pickup order
      if (validCoupons[code].type === 'delivery' && orderType === 'pickup') {
        setCouponError('This coupon is only valid for delivery orders');
        setCouponApplied(null);
        return;
      }
      setCouponApplied({ code, ...validCoupons[code] });
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code');
      setCouponApplied(null);
    }
  };

  const removeCoupon = () => {
    setCouponApplied(null);
    setCouponCode('');
    setCouponError('');
  };

  const getDiscount = () => {
    if (!couponApplied) return 0;
    if (couponApplied.type === 'percent') return subtotal * (couponApplied.value / 100);
    if (couponApplied.type === 'delivery') return actualDeliveryFee; // Only discount the delivery fee
    return couponApplied.value;
  };

  // Tip presets based on subtotal
  const tipPresets = [
    { label: '15%', value: Math.round(subtotal * 0.15 * 100) / 100 },
    { label: '18%', value: Math.round(subtotal * 0.18 * 100) / 100 },
    { label: '20%', value: Math.round(subtotal * 0.20 * 100) / 100 },
    { label: '25%', value: Math.round(subtotal * 0.25 * 100) / 100 },
  ];

  const handleCustomTip = (value) => {
    const tipValue = parseFloat(value);
    if (!isNaN(tipValue) && tipValue >= 0) {
      setDriverTip(tipValue);
    } else if (value === '') {
      setDriverTip(0);
    }
    setCustomTip(value);
  };

  // Calculate totals
  const discount = getDiscount();
  const subtotalAfterDiscount = Math.max(0, subtotal - (couponApplied?.type !== 'delivery' ? discount : 0));
  const deliveryFeeAfterDiscount = couponApplied?.type === 'delivery' ? 0 : actualDeliveryFee;
  const taxableAmount = subtotalAfterDiscount; // Tax on food only, not delivery fee or tip
  const tax = taxableAmount * taxRate;
  const finalTotal = subtotalAfterDiscount + deliveryFeeAfterDiscount + tax + (orderType === 'delivery' ? driverTip : 0);

  const isZipInDeliveryZone = (zip) => {
    return deliveryZones.includes(zip.trim());
  };

  const validateZip = (zip) => {
    if (!zip) {
      setZipError('');
      return;
    }
    if (!isZipInDeliveryZone(zip)) {
      setZipError('outside');
    } else {
      setZipError('');
    }
  };

  // Backend API URL - Change this to your Railway URL after deployment
  const API_URL = 'https://georges-pizza-backend-production.up.railway.app'; // TODO: Update with your Railway URL
  
  const handleCheckout = async () => {
    if (!customerName.trim()) return alert('Please enter your name');
    if (!phone) return alert('Please enter your phone number');
    if (!isValidPhone(phone)) return alert('Please enter a valid 10-digit phone number');
    if (!email) return alert('Please enter your email');
    if (orderType === 'delivery') {
      if (!deliveryAddress.street) return alert('Please enter your street address');
      if (!deliveryAddress.zip) return alert('Please enter your ZIP code');
      if (!isZipInDeliveryZone(deliveryAddress.zip)) {
        return alert('Sorry, we cannot deliver to this ZIP code. Please use DoorDash or UberEats for delivery outside our zone.');
      }
      if (isBelowDeliveryMinimum) return alert(`Delivery minimum is $${deliveryMinimum}. Please add more items or switch to pickup.`);
    }
    if (cart.length === 0) return alert('Your cart is empty');
    
    // Check ASAP when store is closed
    if (scheduleType === 'asap' && !storeStatus.isOpen) {
      return alert("We're currently closed. Please schedule your order for when we're open.");
    }
    
    if (scheduleType === 'scheduled' && (!scheduledDate || !scheduledTime)) {
      return alert('Please select a date and time for your scheduled order.');
    }
    
    setProcessing(true);
    let orderSuccess = false; // Track if order was successful
    
    // Build order data
    const orderData = {
      items: cart.map(item => ({
        name: item.name,
        price: item.price,
        mods: item.mods || [],
      })),
      customerName: customerName.trim(),
      customerEmail: email.trim(),
      phone: phone.trim(),
      orderType,
      deliveryAddress: orderType === 'delivery' ? {
        street: deliveryAddress.street,
        apt: deliveryAddress.apt,
        city: deliveryAddress.city || 'Philadelphia',
        zip: deliveryAddress.zip,
      } : null,
      subtotal,
      discount,
      couponCode: couponApplied?.code || null,
      deliveryFee: orderType === 'delivery' ? deliveryFeeAfterDiscount : 0,
      tax,
      tip: orderType === 'delivery' ? driverTip : 0,
      total: finalTotal,
      specialInstructions: specialInstructions.trim() || null,
      scheduledTime: scheduleType === 'scheduled' 
        ? `${getAvailableDates().find(d => d.value === scheduledDate)?.label} at ${getAvailableTimes().find(t => t.value === scheduledTime)?.label}`
        : null,
    };
    
    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        orderSuccess = true; // Mark as successful
        
        // Success! Show confirmation
        const scheduleInfo = scheduleType === 'scheduled'
          ? `\n\nScheduled for: ${getAvailableDates().find(d => d.value === scheduledDate)?.label} at ${getAvailableTimes().find(t => t.value === scheduledTime)?.label}`
          : `\nEstimated ${orderType}: ${estimate}`;
        
        alert(`🎉 Order #${result.orderNumber} Confirmed!\n\nA confirmation email has been sent to ${email}.${scheduleInfo}\n\n${result.testMode ? '(TEST MODE - No payment charged)' : 'Thank you for your payment!'}`);
        
        // Clear cart and go back to menu
        setCart([]);
        setCurrentView('home');
        setSelectedCategory(null);
        setCouponApplied(null);
        setCouponCode('');
        setSpecialInstructions('');
        setDriverTip(0);
        setCustomerName('');
        setCustomerEmail('');
        setPhone('');
        setDeliveryAddress({ street: '', apt: '', city: 'Philadelphia', zip: '' });
        
      } else {
        alert('Error placing order: ' + (result.error || 'Unknown error'));
      }
      
    } catch (error) {
      // Only show error if order wasn't already successful
      if (!orderSuccess) {
        console.error('Checkout error:', error);
        alert('Error connecting to server. Please try again or call us at (215) 236-5288.');
      }
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div>
      <button type="button" onClick={onBack} className="btn-outline" style={{ marginBottom: 16 }}>← Continue Ordering</button>
      
      {/* 1. YOUR ITEMS */}
      <div className="red-banner">Your Items</div>
      <div style={{ background: 'white', border: '2px solid #ddd' }}>
        {cart.length === 0 ? (
          <div style={{ padding: 32, textAlign: 'center', color: '#666' }}>Your cart is empty</div>
        ) : (
          <div style={{ padding: 16 }}>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '10px 0', borderBottom: '1px dotted #ccc' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{item.name}</div>
                  {item.mods?.length > 0 && <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>{item.mods.join(', ')}</div>}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontWeight: 700, color: '#C41E3A' }}>${item.price.toFixed(2)}</span>
                  <button type="button" onClick={() => onRemove(item.id)} style={{ background: 'none', border: '1px solid #ccc', padding: '2px 6px', cursor: 'pointer', fontSize: 11 }}>✕</button>
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, marginTop: 8, borderTop: '1px solid #ddd' }}>
              <span style={{ fontWeight: 600 }}>Subtotal</span>
              <span style={{ fontWeight: 700, color: '#C41E3A' }}>${subtotal.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>

      {/* 2. FORGOT SOMETHING? - Upsells */}
      <div style={{ background: '#FFF8E1', border: '2px solid #FFB300', padding: 16, marginTop: 16 }}>
        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 10, color: '#666' }}>
          🍟 FORGOT SOMETHING?
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button type="button" onClick={() => onNavigateToCategory('sides')} style={{ flex: 1, minWidth: 100, padding: '10px 12px', background: 'white', border: '2px solid #C41E3A', color: '#C41E3A', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>
            + Sides & Apps
          </button>
          <button type="button" onClick={() => onNavigateToCategory('drinks')} style={{ flex: 1, minWidth: 100, padding: '10px 12px', background: 'white', border: '2px solid #C41E3A', color: '#C41E3A', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>
            + Drinks & Chips
          </button>
          <button type="button" onClick={() => onNavigateToCategory('drinks')} style={{ flex: 1, minWidth: 100, padding: '10px 12px', background: 'white', border: '2px solid #C41E3A', color: '#C41E3A', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>
            + Desserts
          </button>
        </div>
      </div>

      {/* 3. PICKUP OR DELIVERY - Prominent Selection */}
      <div style={{ background: '#C41E3A', padding: 16, marginTop: 16 }}>
        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 12, color: 'white', textAlign: 'center' }}>
          HOW WOULD YOU LIKE YOUR ORDER?
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            type="button"
            onClick={() => setOrderType('pickup')}
            style={{
              flex: 1,
              padding: '16px 12px',
              background: orderType === 'pickup' ? 'white' : 'rgba(255,255,255,0.1)',
              color: orderType === 'pickup' ? '#C41E3A' : 'white',
              border: '3px solid white',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: 16,
              fontFamily: "'Oswald', sans-serif",
            }}
          >
            🏃 PICKUP
            <div style={{ fontSize: 11, fontWeight: 400, marginTop: 4, fontFamily: 'inherit' }}>~15 minutes</div>
          </button>
          <button
            type="button"
            onClick={() => setOrderType('delivery')}
            style={{
              flex: 1,
              padding: '16px 12px',
              background: orderType === 'delivery' ? 'white' : 'rgba(255,255,255,0.1)',
              color: orderType === 'delivery' ? '#C41E3A' : 'white',
              border: '3px solid white',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: 16,
              fontFamily: "'Oswald', sans-serif",
            }}
          >
            🚗 DELIVERY
            <div style={{ fontSize: 11, fontWeight: 400, marginTop: 4, fontFamily: 'inherit' }}>35-45 minutes • $3 fee</div>
          </button>
        </div>
        {orderType === 'delivery' && isBelowDeliveryMinimum && (
          <div style={{ background: '#FFF3CD', color: '#856404', padding: 10, marginTop: 12, fontSize: 13, textAlign: 'center', fontWeight: 600 }}>
            ⚠️ Delivery minimum is ${deliveryMinimum}. Add ${amountNeededForMinimum.toFixed(2)} more.
          </div>
        )}
      </div>

      {/* 4. COUPON CODE */}
      <div style={{ background: 'white', border: '2px solid #ddd', padding: 16, marginTop: 16 }}>
        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>COUPON CODE</div>
        {couponApplied ? (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 10, background: '#E8F5E9', border: '1px solid #228B22' }}>
            <div>
              <span style={{ fontWeight: 700, color: '#228B22' }}>✔ {couponApplied.code}</span>
              <span style={{ marginLeft: 8, color: '#666', fontSize: 13 }}>({couponApplied.desc})</span>
            </div>
            <button type="button" onClick={removeCoupon} style={{ background: 'none', border: 'none', color: '#C41E3A', cursor: 'pointer', fontWeight: 600 }}>Remove</button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="text"
              value={couponCode}
              onChange={e => { setCouponCode(e.target.value); setCouponError(''); }}
              placeholder="Enter code"
              style={{ flex: 1, padding: 10, fontSize: 14, border: '2px solid #ddd', fontFamily: 'inherit', textTransform: 'uppercase' }}
            />
            <button type="button" className="btn-outline" onClick={applyCoupon} style={{ whiteSpace: 'nowrap' }}>Apply</button>
          </div>
        )}
        {couponError && <div style={{ color: '#C41E3A', fontSize: 12, marginTop: 6 }}>{couponError}</div>}
      </div>

      {/* 5. DRIVER TIP - Only for Delivery */}
      {orderType === 'delivery' && (
        <div style={{ background: 'white', border: '2px solid #ddd', padding: 16, marginTop: 16 }}>
          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 4, color: '#666' }}>
            TIP YOUR DRIVER
          </div>
          <div style={{ fontSize: 12, color: '#228B22', marginBottom: 12 }}>
            💚 100% of your tip goes directly to the driver.
          </div>
          
          <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
            {tipPresets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => { setDriverTip(preset.value); setCustomTip(''); }}
                style={{
                  flex: 1,
                  minWidth: 70,
                  padding: '10px 8px',
                  background: driverTip === preset.value ? '#C41E3A' : 'white',
                  color: driverTip === preset.value ? 'white' : '#333',
                  border: `2px solid ${driverTip === preset.value ? '#C41E3A' : '#ddd'}`,
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: 13,
                  textAlign: 'center'
                }}
              >
                <div>{preset.label}</div>
                <div style={{ fontSize: 11, opacity: 0.8 }}>${preset.value.toFixed(2)}</div>
              </button>
            ))}
          </div>
          
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button
              type="button"
              onClick={() => { setDriverTip(0); setCustomTip(''); }}
              style={{
                padding: '10px 16px',
                background: driverTip === 0 && customTip === '' ? '#C41E3A' : 'white',
                color: driverTip === 0 && customTip === '' ? 'white' : '#333',
                border: `2px solid ${driverTip === 0 && customTip === '' ? '#C41E3A' : '#ddd'}`,
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 13
              }}
            >
              No Tip
            </button>
            <div style={{ flex: 1, position: 'relative' }}>
              <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#666' }}>$</span>
              <input
                type="number"
                value={customTip}
                onChange={(e) => handleCustomTip(e.target.value)}
                placeholder="Custom"
                min="0"
                step="0.50"
                style={{ width: '100%', padding: '10px 10px 10px 28px', fontSize: 14, border: '2px solid #ddd', fontFamily: 'inherit' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* 6. ORDER TIMING */}
      <div style={{ background: 'white', border: '2px solid #ddd', padding: 16, marginTop: 16 }}>
        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 12, color: '#666' }}>
          WHEN DO YOU WANT YOUR ORDER?
        </div>
        
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <button
            type="button"
            onClick={() => { 
              if (storeStatus.isOpen) {
                setScheduleType('asap'); 
                setScheduledDate(''); 
                setScheduledTime(''); 
              }
            }}
            disabled={!storeStatus.isOpen}
            style={{
              flex: 1,
              padding: '12px 16px',
              background: scheduleType === 'asap' ? '#C41E3A' : 'white',
              color: scheduleType === 'asap' ? 'white' : (storeStatus.isOpen ? '#333' : '#999'),
              border: `2px solid ${scheduleType === 'asap' ? '#C41E3A' : '#ddd'}`,
              fontWeight: 600,
              cursor: storeStatus.isOpen ? 'pointer' : 'not-allowed',
              fontSize: 14,
              opacity: storeStatus.isOpen ? 1 : 0.6
            }}
          >
            🚀 ASAP {!storeStatus.isOpen && '(Closed)'}
          </button>
          <button
            type="button"
            onClick={() => setScheduleType('scheduled')}
            style={{
              flex: 1,
              padding: '12px 16px',
              background: scheduleType === 'scheduled' ? '#C41E3A' : 'white',
              color: scheduleType === 'scheduled' ? 'white' : '#333',
              border: `2px solid ${scheduleType === 'scheduled' ? '#C41E3A' : '#ddd'}`,
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: 14
            }}
          >
            📅 Schedule
          </button>
        </div>

        {scheduleType === 'asap' && storeStatus.isOpen && (
          <div style={{ background: '#E8F5E9', padding: 12, fontSize: 14, color: '#2E7D32' }}>
            ✔ Your order will be ready {estimate}
          </div>
        )}
        
        {scheduleType === 'asap' && !storeStatus.isOpen && (
          <div style={{ background: '#FFF3E0', padding: 12, fontSize: 14, color: '#E65100' }}>
            â° We're currently closed. Please schedule your order for when we're open.
          </div>
        )}

        {scheduleType === 'scheduled' && (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 140 }}>
              <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>SELECT DATE</div>
              <select
                value={scheduledDate}
                onChange={(e) => { setScheduledDate(e.target.value); setScheduledTime(''); }}
                style={{ width: '100%', padding: 10, fontSize: 14, border: '2px solid #ddd', background: 'white' }}
              >
                <option value="">Choose date...</option>
                {getAvailableDates().map(d => (
                  <option key={d.value} value={d.value}>{d.label}</option>
                ))}
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 140 }}>
              <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>SELECT TIME</div>
              <select
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                disabled={!scheduledDate}
                style={{ width: '100%', padding: 10, fontSize: 14, border: '2px solid #ddd', background: scheduledDate ? 'white' : '#f5f5f5' }}
              >
                <option value="">Choose time...</option>
                {getAvailableTimes().map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {scheduleType === 'scheduled' && scheduledDate && scheduledTime && (
          <div style={{ background: '#E3F2FD', padding: 12, fontSize: 14, color: '#1565C0', marginTop: 12 }}>
            📅 Scheduled for {getAvailableDates().find(d => d.value === scheduledDate)?.label} at {getAvailableTimes().find(t => t.value === scheduledTime)?.label}
          </div>
        )}
      </div>

      {/* Delivery Details - Only show for delivery orders */}
      {orderType === 'delivery' && (
        <div style={{ background: 'white', border: '2px solid #ddd', padding: 16, marginTop: 16 }}>
          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 12, color: '#666' }}>DELIVERY DETAILS</div>
          
          {/* Customer Name for Delivery */}
          <div style={{ marginBottom: 10 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: '#666' }}>Name *</label>
            <input
              type="text"
              value={customerName}
              onChange={e => setCustomerName(e.target.value)}
              placeholder="Your name"
              style={{ width: '100%', padding: 10, fontSize: 14, border: '2px solid #ddd', fontFamily: 'inherit' }}
            />
          </div>

          {/* Phone for Delivery */}
          <div style={{ marginBottom: 10 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: '#666' }}>Phone Number *</label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(formatPhoneNumber(e.target.value))}
              placeholder="(215) 555-1234"
              style={{ 
                width: '100%', 
                padding: 10, 
                fontSize: 14, 
                border: `2px solid ${phone && !isValidPhone(phone) ? '#C41E3A' : '#ddd'}`, 
                fontFamily: 'inherit' 
              }}
            />
            {phone && !isValidPhone(phone) && (
              <div style={{ fontSize: 11, color: '#C41E3A', marginTop: 4 }}>Please enter a valid 10-digit phone number</div>
            )}
          </div>
          
          <div style={{ marginBottom: 10 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: '#666' }}>Street Address *</label>
            <input
              type="text"
              value={deliveryAddress.street}
              onChange={e => setDeliveryAddress({ ...deliveryAddress, street: e.target.value })}
              placeholder="123 Main Street"
              style={{ width: '100%', padding: 10, fontSize: 14, border: '2px solid #ddd', fontFamily: 'inherit' }}
            />
          </div>

          <div style={{ marginBottom: 10 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: '#666' }}>Apt/Suite/Unit</label>
            <input
              type="text"
              value={deliveryAddress.apt}
              onChange={e => setDeliveryAddress({ ...deliveryAddress, apt: e.target.value })}
              placeholder="Apt 2B (optional)"
              style={{ width: '100%', padding: 10, fontSize: 14, border: '2px solid #ddd', fontFamily: 'inherit' }}
            />
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 2 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: '#666' }}>City</label>
              <input
                type="text"
                value={deliveryAddress.city}
                onChange={e => setDeliveryAddress({ ...deliveryAddress, city: e.target.value })}
                style={{ width: '100%', padding: 10, fontSize: 14, border: '2px solid #ddd', fontFamily: 'inherit' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: '#666' }}>ZIP *</label>
              <input
                type="text"
                value={deliveryAddress.zip}
                onChange={e => {
                  setDeliveryAddress({ ...deliveryAddress, zip: e.target.value });
                  validateZip(e.target.value);
                }}
                placeholder="19123"
                style={{ 
                  width: '100%', 
                  padding: 10, 
                  fontSize: 14, 
                  border: `2px solid ${zipError ? '#C41E3A' : '#ddd'}`, 
                  fontFamily: 'inherit' 
                }}
              />
            </div>
          </div>

          {/* ZIP Code Error / Out of Zone Message */}
          {zipError === 'outside' && (
            <div style={{ marginTop: 12, padding: 12, background: '#FFF0F0', border: '2px solid #C41E3A', borderRadius: 4 }}>
              <div style={{ fontWeight: 700, color: '#C41E3A', marginBottom: 8 }}>
                😔 Sorry, this ZIP code is outside our delivery zone
              </div>
              <div style={{ fontSize: 13, color: '#666', marginBottom: 12 }}>
                We deliver to: {deliveryZones.join(', ')}
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Order through our delivery partners:</div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <a 
                  href="https://www.doordash.com/store/george's-pizza-philadelphia-24498442/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '10px 16px',
                    background: '#FF3008',
                    color: 'white',
                    textDecoration: 'none',
                    fontFamily: "'Oswald', sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                  }}
                >
                  🚗 DoorDash
                </a>
                <a 
                  href="https://www.ubereats.com/store/georges-pizza/example" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '10px 16px',
                    background: '#06C167',
                    color: 'white',
                    textDecoration: 'none',
                    fontFamily: "'Oswald', sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                  }}
                >
                  📍 UberEats
                </a>
              </div>
            </div>
          )}

          {!zipError && (
            <div style={{ marginTop: 10, padding: 8, background: '#E8F5E9', fontSize: 12, color: '#228B22' }}>
              ✔ We deliver to: {deliveryZones.join(', ')} • ${deliveryMinimum} minimum
            </div>
          )}
        </div>
      )}

      {/* Contact Info - Pickup or additional for delivery */}
      <div style={{ background: 'white', border: '2px solid #ddd', padding: 16, marginTop: 16 }}>
        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 12, color: '#666' }}>
          {orderType === 'pickup' ? 'YOUR DETAILS' : 'ADDITIONAL CONTACT'}
        </div>

        {/* Customer Name - Only show here for pickup (delivery has it above) */}
        {orderType === 'pickup' && (
          <div style={{ marginBottom: 10 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: '#666' }}>Name *</label>
            <input
              type="text"
              value={customerName}
              onChange={e => setCustomerName(e.target.value)}
              placeholder="Your name"
              style={{ width: '100%', padding: 10, fontSize: 14, border: '2px solid #ddd', fontFamily: 'inherit' }}
            />
          </div>
        )}

        {/* Phone - Only show here for pickup */}
        {orderType === 'pickup' && (
          <div style={{ marginBottom: 10 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: '#666' }}>Phone Number *</label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(formatPhoneNumber(e.target.value))}
              placeholder="(215) 555-1234"
              style={{ 
                width: '100%', 
                padding: 10, 
                fontSize: 14, 
                border: `2px solid ${phone && !isValidPhone(phone) ? '#C41E3A' : '#ddd'}`, 
                fontFamily: 'inherit' 
              }}
            />
            {phone && !isValidPhone(phone) && (
              <div style={{ fontSize: 11, color: '#C41E3A', marginTop: 4 }}>Please enter a valid 10-digit phone number</div>
            )}
          </div>
        )}

        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: '#666' }}>Email for Receipt *</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            style={{ width: '100%', padding: 10, fontSize: 14, border: '2px solid #ddd', fontFamily: 'inherit' }}
          />
        </div>
      </div>

      {/* Special Instructions */}
      <div style={{ background: 'white', border: '2px solid #ddd', padding: 16, marginTop: 16 }}>
        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>
          SPECIAL INSTRUCTIONS / NOTES
        </div>
        <textarea
          value={specialInstructions}
          onChange={e => setSpecialInstructions(e.target.value)}
          placeholder="Any special requests or notes for the kitchen? (e.g., allergies, extra napkins, ring doorbell, etc.)"
          maxLength={500}
          style={{
            width: '100%',
            minHeight: 80,
            padding: 10,
            fontSize: 14,
            border: '1px solid #ddd',
            borderRadius: 4,
            resize: 'vertical',
            fontFamily: 'inherit'
          }}
        />
        <div style={{ fontSize: 11, color: '#999', marginTop: 4, textAlign: 'right' }}>
          {specialInstructions.length}/500 characters
        </div>
      </div>

      {/* Email Consent Checkbox */}
      <div style={{ marginTop: 16 }}>
        <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer', gap: 10 }}>
          <input
            type="checkbox"
            checked={emailConsent}
            onChange={e => setEmailConsent(e.target.checked)}
            style={{ marginTop: 3, width: 18, height: 18, accentColor: '#C41E3A' }}
          />
          <span style={{ fontSize: 13, color: '#666', lineHeight: 1.4 }}>
            Yes, I'd like to receive promotional emails from George's Pizza about special offers, new menu items, and exclusive deals. You can unsubscribe at any time.
          </span>
        </label>
      </div>

      {/* Delivery Minimum Warning */}
      {isBelowDeliveryMinimum && (
        <div style={{ 
          marginTop: 16, 
          padding: 12, 
          background: '#FFF3CD', 
          border: '2px solid #FFc107', 
          borderRadius: 4,
          textAlign: 'center'
        }}>
          <div style={{ fontWeight: 600, color: '#856404', marginBottom: 4 }}>
            ⚠️ Delivery Minimum Not Met
          </div>
          <div style={{ fontSize: 13, color: '#856404' }}>
            Add ${amountNeededForMinimum.toFixed(2)} more to your order for delivery (${deliveryMinimum} minimum)
          </div>
          <button type="button"
            className="btn-outline"
            onClick={onBack}
            style={{ marginTop: 10, fontSize: 12 }}
          >
            ← Add More Items
          </button>
        </div>
      )}

      {/* ORDER SUMMARY - Shows full breakdown */}
      {cart.length > 0 && (
        <div style={{ background: 'white', border: '2px solid #C41E3A', padding: 16, marginTop: 16 }}>
          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#C41E3A' }}>
            ORDER SUMMARY
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 8, borderBottom: '1px solid #eee' }}>
            <span style={{ color: '#666' }}>Subtotal ({cart.length} item{cart.length !== 1 ? 's' : ''})</span>
            <span style={{ fontWeight: 600 }}>${subtotal.toFixed(2)}</span>
          </div>
          
          {couponApplied && (
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 8, color: '#228B22' }}>
              <span>Discount ({couponApplied.code})</span>
              <span style={{ fontWeight: 600 }}>-${discount.toFixed(2)}</span>
            </div>
          )}
          
          {orderType === 'delivery' && (
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 8 }}>
              <span style={{ color: '#666' }}>Delivery Fee</span>
              <span style={{ fontWeight: 600 }}>
                {deliveryFeeAfterDiscount === 0 ? <span style={{ color: '#228B22' }}>FREE</span> : `$${deliveryFee.toFixed(2)}`}
              </span>
            </div>
          )}
          
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 8 }}>
            <span style={{ color: '#666' }}>Tax (8%)</span>
            <span style={{ fontWeight: 600 }}>${tax.toFixed(2)}</span>
          </div>
          
          {orderType === 'delivery' && driverTip > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 8 }}>
              <span style={{ color: '#666' }}>Driver Tip</span>
              <span style={{ fontWeight: 600, color: '#228B22' }}>${driverTip.toFixed(2)}</span>
            </div>
          )}

          {subtotal >= 45 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 8, color: '#228B22' }}>
              <span>🎉 FREE 2 Liter Soda!</span>
              <span style={{ fontWeight: 600 }}>$0.00</span>
            </div>
          )}
          
          {subtotal > 0 && subtotal < 45 && (
            <div style={{ fontSize: 12, color: '#666', paddingTop: 8, fontStyle: 'italic' }}>
              💡 Add ${(45 - subtotal).toFixed(2)} more for a FREE 2 Liter Soda!
            </div>
          )}
          
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, marginTop: 8, borderTop: '2px solid #1a1a1a' }}>
            <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 700 }}>TOTAL</span>
            <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 22, fontWeight: 700, color: '#C41E3A' }}>${finalTotal.toFixed(2)}</span>
          </div>
        </div>
      )}

      <button type="button"
        className="btn-red" 
        onClick={handleCheckout} 
        disabled={processing || cart.length === 0 || (orderType === 'delivery' && zipError === 'outside') || isBelowDeliveryMinimum} 
        style={{ width: '100%', marginTop: 16, padding: 14, fontSize: 16 }}
      >
        {processing ? 'Processing...' : `🧪 Place Test Order ($${finalTotal.toFixed(2)})`}
      </button>

      <div style={{ textAlign: 'center', marginTop: 10, fontSize: 12, color: '#666' }}>
        🧪 TEST MODE - No payment will be charged
      </div>

      {/* Alternative Delivery Partners - Always visible at bottom */}
      <div style={{ marginTop: 20, padding: 16, background: '#F5F5F5', border: '1px solid #ddd', textAlign: 'center' }}>
        <div style={{ fontSize: 13, color: '#666', marginBottom: 10 }}>Also available on:</div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a 
            href="https://www.doordash.com/store/george's-pizza-philadelphia-24498442/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              padding: '8px 12px',
              background: 'white',
              border: '1px solid #ddd',
              color: '#FF3008',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: 13,
              borderRadius: 4,
            }}
          >
            DoorDash
          </a>
          <a 
            href="https://www.ubereats.com/store/georges-pizza/example" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              padding: '8px 12px',
              background: 'white',
              border: '1px solid #ddd',
              color: '#06C167',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: 13,
              borderRadius: 4,
            }}
          >
            UberEats
          </a>
        </div>
      </div>
    </div>
  );
}
