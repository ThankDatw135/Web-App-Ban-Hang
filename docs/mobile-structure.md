# Cấu Trúc Ứng Dụng Mobile - React Native (Kiểu Android Studio)

Cấu trúc dự án React Native được tổ chức theo phong cách Android Studio để dễ quản lý và phát triển.

---

## 📁 Cấu Trúc Thư Mục Đầy Đủ

```
mobile/
├── android/                          # Android native code
│   ├── app/
│   │   ├── src/
│   │   │   ├── main/
│   │   │   │   ├── java/com/luxuryfashion/
│   │   │   │   │   └── MainActivity.java
│   │   │   │   ├── res/              # Android resources
│   │   │   │   │   ├── drawable/     # Icons, images
│   │   │   │   │   ├── layout/       # XML layouts (nếu cần)
│   │   │   │   │   ├── mipmap-*/     # App icons
│   │   │   │   │   └── values/       # Strings, colors, styles
│   │   │   │   │       ├── strings.xml
│   │   │   │   │       ├── colors.xml
│   │   │   │   │       └── styles.xml
│   │   │   │   └── AndroidManifest.xml
│   │   │   └── debug/
│   │   │       └── AndroidManifest.xml
│   │   ├── build.gradle              # App-level Gradle
│   │   └── proguard-rules.pro
│   ├── gradle/
│   │   └── wrapper/
│   ├── build.gradle                  # Project-level Gradle
│   ├── gradle.properties
│   └── settings.gradle
│
├── ios/                              # iOS native code
│   ├── LuxuryFashion/
│   │   ├── AppDelegate.h
│   │   ├── AppDelegate.m
│   │   ├── Info.plist
│   │   ├── LaunchScreen.storyboard
│   │   └── Images.xcassets/
│   ├── LuxuryFashion.xcodeproj/
│   └── Podfile
│
├── src/                              # Source code chính
│   ├── app/                          # Application core
│   │   ├── App.tsx                   # Root component
│   │   ├── store/                    # State management
│   │   │   ├── index.ts
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.ts
│   │   │   │   ├── cartSlice.ts
│   │   │   │   ├── productSlice.ts
│   │   │   │   └── userSlice.ts
│   │   │   └── types.ts
│   │   └── config/
│   │       ├── constants.ts
│   │       ├── firebase.ts
│   │       └── api.ts
│   │
│   ├── screens/                      # Màn hình (giống Activities/Fragments)
│   │   ├── auth/
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── RegisterScreen.tsx
│   │   │   ├── ForgotPasswordScreen.tsx
│   │   │   └── index.ts
│   │   ├── home/
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── components/
│   │   │   │   ├── HeroBanner.tsx
│   │   │   │   ├── FeaturedProducts.tsx
│   │   │   │   └── CategorySection.tsx
│   │   │   └── index.ts
│   │   ├── product/
│   │   │   ├── ProductListScreen.tsx
│   │   │   ├── ProductDetailScreen.tsx
│   │   │   ├── components/
│   │   │   │   ├── ProductCard.tsx
│   │   │   │   ├── ProductGallery.tsx
│   │   │   │   ├── SizeSelector.tsx
│   │   │   │   └── QuantitySelector.tsx
│   │   │   └── index.ts
│   │   ├── cart/
│   │   │   ├── CartScreen.tsx
│   │   │   ├── CheckoutScreen.tsx
│   │   │   ├── OrderSuccessScreen.tsx
│   │   │   ├── components/
│   │   │   │   ├── CartItem.tsx
│   │   │   │   ├── CartSummary.tsx
│   │   │   │   └── ShippingForm.tsx
│   │   │   └── index.ts
│   │   ├── tryon/
│   │   │   ├── AITryOnScreen.tsx
│   │   │   ├── TryOnHistoryScreen.tsx
│   │   │   ├── components/
│   │   │   │   ├── PhotoUploader.tsx
│   │   │   │   ├── ProductSelector.tsx
│   │   │   │   ├── ProcessingIndicator.tsx
│   │   │   │   └── ResultViewer.tsx
│   │   │   └── index.ts
│   │   ├── account/
│   │   │   ├── AccountScreen.tsx
│   │   │   ├── ProfileScreen.tsx
│   │   │   ├── OrderHistoryScreen.tsx
│   │   │   ├── OrderDetailScreen.tsx
│   │   │   ├── SettingsScreen.tsx
│   │   │   ├── components/
│   │   │   │   ├── ProfileHeader.tsx
│   │   │   │   ├── MenuList.tsx
│   │   │   │   └── OrderCard.tsx
│   │   │   └── index.ts
│   │   └── notifications/
│   │       ├── NotificationsScreen.tsx
│   │       ├── components/
│   │       │   └── NotificationItem.tsx
│   │       └── index.ts
│   │
│   ├── components/                   # Shared components (giống layouts)
│   │   ├── ui/                       # UI components cơ bản
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.styles.ts
│   │   │   │   └── index.ts
│   │   │   ├── Input/
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Input.styles.ts
│   │   │   │   └── index.ts
│   │   │   ├── Card/
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Card.styles.ts
│   │   │   │   └── index.ts
│   │   │   ├── Modal/
│   │   │   │   ├── Modal.tsx
│   │   │   │   ├── Modal.styles.ts
│   │   │   │   └── index.ts
│   │   │   ├── Loading/
│   │   │   │   ├── Loading.tsx
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── layout/                   # Layout components
│   │   │   ├── Header/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Header.styles.ts
│   │   │   │   └── index.ts
│   │   │   ├── TabBar/
│   │   │   │   ├── TabBar.tsx
│   │   │   │   ├── TabBar.styles.ts
│   │   │   │   └── index.ts
│   │   │   ├── Container/
│   │   │   │   ├── Container.tsx
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── navigation/                   # Navigation (giống Intent/Navigation)
│   │   ├── AppNavigator.tsx          # Main navigator
│   │   ├── AuthNavigator.tsx         # Auth stack
│   │   ├── MainNavigator.tsx         # Main tab navigator
│   │   ├── ProductNavigator.tsx      # Product stack
│   │   ├── AccountNavigator.tsx      # Account stack
│   │   ├── types.ts                  # Navigation types
│   │   └── index.ts
│   │
│   ├── services/                     # Services (giống Services trong Android)
│   │   ├── api/
│   │   │   ├── client.ts             # API client (Axios/Fetch)
│   │   │   ├── endpoints.ts          # API endpoints
│   │   │   ├── auth.service.ts
│   │   │   ├── user.service.ts
│   │   │   ├── product.service.ts
│   │   │   ├── cart.service.ts
│   │   │   ├── order.service.ts
│   │   │   ├── tryon.service.ts
│   │   │   └── index.ts
│   │   ├── firebase/
│   │   │   ├── auth.ts
│   │   │   ├── messaging.ts          # Push notifications
│   │   │   └── index.ts
│   │   ├── storage/
│   │   │   ├── AsyncStorage.ts       # Local storage
│   │   │   ├── SecureStorage.ts      # Secure storage
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── hooks/                        # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── useCart.ts
│   │   ├── useProducts.ts
│   │   ├── useOrders.ts
│   │   ├── useNotifications.ts
│   │   ├── useImagePicker.ts
│   │   └── index.ts
│   │
│   ├── utils/                        # Utilities (giống utils trong Android)
│   │   ├── helpers/
│   │   │   ├── formatters.ts         # Format currency, date, etc.
│   │   │   ├── validators.ts         # Form validation
│   │   │   ├── imageHelpers.ts
│   │   │   └── index.ts
│   │   ├── constants/
│   │   │   ├── colors.ts
│   │   │   ├── typography.ts
│   │   │   ├── spacing.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── types/                        # TypeScript types
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   ├── Product.ts
│   │   │   ├── Cart.ts
│   │   │   ├── Order.ts
│   │   │   └── index.ts
│   │   ├── api/
│   │   │   ├── requests.ts
│   │   │   ├── responses.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── theme/                        # Theme configuration
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   ├── shadows.ts
│   │   ├── animations.ts
│   │   ├── index.ts
│   │   └── theme.d.ts
│   │
│   └── assets/                       # Assets (giống res/ trong Android)
│       ├── images/
│       │   ├── logo.png
│       │   ├── placeholder.png
│       │   └── index.ts
│       ├── icons/
│       │   ├── home.svg
│       │   ├── cart.svg
│       │   ├── account.svg
│       │   └── index.ts
│       ├── fonts/
│       │   ├── PlayfairDisplay-Regular.ttf
│       │   ├── PlayfairDisplay-Bold.ttf
│       │   ├── Inter-Regular.ttf
│       │   └── Inter-Bold.ttf
│       └── animations/
│           └── loading.json           # Lottie animations
│
├── __tests__/                        # Tests
│   ├── components/
│   ├── screens/
│   ├── services/
│   └── utils/
│
├── .env                              # Environment variables
├── .env.example
├── .eslintrc.js
├── .prettierrc.js
├── tsconfig.json
├── babel.config.js
├── metro.config.js
├── package.json
├── app.json
├── index.js                          # Entry point
└── README.md
```

---

## 📱 Chi Tiết Các Thư Mục Chính

### 1. `android/` - Android Native

Giống như Android Studio project:

```
android/
├── app/
│   ├── src/main/
│   │   ├── java/com/luxuryfashion/
│   │   │   └── MainActivity.java
│   │   ├── res/
│   │   │   ├── drawable/          # Icons, splash screen
│   │   │   ├── mipmap-hdpi/       # App icons
│   │   │   ├── mipmap-mdpi/
│   │   │   ├── mipmap-xhdpi/
│   │   │   ├── mipmap-xxhdpi/
│   │   │   ├── mipmap-xxxhdpi/
│   │   │   └── values/
│   │   │       ├── strings.xml
│   │   │       ├── colors.xml
│   │   │       └── styles.xml
│   │   └── AndroidManifest.xml
│   └── build.gradle
└── build.gradle
```

**MainActivity.java:**

```java
package com.luxuryfashion;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

public class MainActivity extends ReactActivity {
  @Override
  protected String getMainComponentName() {
    return "LuxuryFashion";
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        DefaultNewArchitectureEntryPoint.getFabricEnabled()
    );
  }
}
```

**AndroidManifest.xml:**

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

    <application
      android:name=".MainApplication"
      android:label="@string/app_name"
      android:icon="@mipmap/ic_launcher"
      android:roundIcon="@mipmap/ic_launcher_round"
      android:allowBackup="false"
      android:theme="@style/AppTheme">

      <activity
        android:name=".MainActivity"
        android:label="@string/app_name"
        android:configChanges="keyboard|keyboardHidden|orientation|screenLayout|screenSize|smallestScreenSize|uiMode"
        android:launchMode="singleTask"
        android:windowSoftInputMode="adjustResize"
        android:exported="true">
        <intent-filter>
            <action android:name="android.intent.action.MAIN" />
            <category android:name="android.intent.category.LAUNCHER" />
        </intent-filter>
      </activity>
    </application>
</manifest>
```

**res/values/strings.xml:**

```xml
<resources>
    <string name="app_name">Luxury Fashion</string>
</resources>
```

**res/values/colors.xml:**

```xml
<resources>
    <color name="primary">#0E0E0E</color>
    <color name="accent">#C9B37E</color>
    <color name="background">#121212</color>
</resources>
```

**res/values/styles.xml:**

```xml
<resources>
    <style name="AppTheme" parent="Theme.AppCompat.DayNight.NoActionBar">
        <item name="android:editTextBackground">@drawable/rn_edit_text_material</item>
        <item name="android:statusBarColor">@color/background</item>
    </style>
</resources>
```

---

### 2. `src/screens/` - Màn Hình (Activities/Fragments)

Mỗi màn hình được tổ chức như một module riêng:

**Ví dụ: HomeScreen**

```typescript
// src/screens/home/HomeScreen.tsx
import React, { useEffect } from "react";
import { ScrollView, RefreshControl } from "react-native";
import { useProducts } from "../../hooks/useProducts";
import { HeroBanner } from "./components/HeroBanner";
import { FeaturedProducts } from "./components/FeaturedProducts";
import { CategorySection } from "./components/CategorySection";
import { Container } from "../../components/layout/Container";
import { Loading } from "../../components/ui/Loading";
import { styles } from "./HomeScreen.styles";

export const HomeScreen: React.FC = () => {
  const { products, loading, refresh, fetchFeatured } = useProducts();

  useEffect(() => {
    fetchFeatured();
  }, []);

  if (loading && !products.length) {
    return <Loading />;
  }

  return (
    <Container>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} />
        }
      >
        <HeroBanner />
        <FeaturedProducts products={products} />
        <CategorySection />
      </ScrollView>
    </Container>
  );
};
```

**Ví dụ: ProductDetailScreen**

```typescript
// src/screens/product/ProductDetailScreen.tsx
import React, { useEffect, useState } from "react";
import { View, ScrollView, Image } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProductNavigatorParamList } from "../../navigation/types";
import { useCart } from "../../hooks/useCart";
import { ProductGallery } from "./components/ProductGallery";
import { SizeSelector } from "./components/SizeSelector";
import { QuantitySelector } from "./components/QuantitySelector";
import { Button } from "../../components/ui/Button";
import { styles } from "./ProductDetailScreen.styles";

type ProductDetailScreenRouteProp = RouteProp<
  ProductNavigatorParamList,
  "ProductDetail"
>;

type ProductDetailScreenNavigationProp = StackNavigationProp<
  ProductNavigatorParamList,
  "ProductDetail"
>;

interface Props {
  route: ProductDetailScreenRouteProp;
  navigation: ProductDetailScreenNavigationProp;
}

export const ProductDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { productId } = route.params;
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = async () => {
    if (!selectedSize) {
      // Show error
      return;
    }

    await addToCart({
      productId,
      size: selectedSize,
      quantity,
    });

    navigation.navigate("Cart");
  };

  return (
    <ScrollView style={styles.container}>
      <ProductGallery productId={productId} />

      <View style={styles.content}>
        <SizeSelector
          sizes={["S", "M", "L", "XL"]}
          selected={selectedSize}
          onSelect={setSelectedSize}
        />

        <QuantitySelector value={quantity} onChange={setQuantity} />

        <Button
          title="Thêm Vào Giỏ"
          onPress={handleAddToCart}
          disabled={!selectedSize}
        />
      </View>
    </ScrollView>
  );
};
```

---

### 3. `src/navigation/` - Điều Hướng (Intent/Navigation)

**AppNavigator.tsx:**

```typescript
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "../hooks/useAuth";
import { AuthNavigator } from "./AuthNavigator";
import { MainNavigator } from "./MainNavigator";
import { Loading } from "../components/ui/Loading";

const Stack = createStackNavigator();

export const AppNavigator: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Main" component={MainNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
```

**MainNavigator.tsx (Tab Navigation):**

```typescript
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/home/HomeScreen";
import { CartScreen } from "../screens/cart/CartScreen";
import { AITryOnScreen } from "../screens/tryon/AITryOnScreen";
import { NotificationsScreen } from "../screens/notifications/NotificationsScreen";
import { AccountScreen } from "../screens/account/AccountScreen";
import { TabBar } from "../components/layout/TabBar";

const Tab = createBottomTabNavigator();

export const MainNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Trang Chủ" }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: "Giỏ Hàng" }}
      />
      <Tab.Screen
        name="TryOn"
        component={AITryOnScreen}
        options={{ title: "Thử Đồ" }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ title: "Thông Báo" }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{ title: "Tài Khoản" }}
      />
    </Tab.Navigator>
  );
};
```

---

### 4. `src/services/` - Services (Giống Services trong Android)

**api/client.ts:**

```typescript
import axios from "axios";
import { getToken } from "../storage/AsyncStorage";

const API_BASE_URL = "https://api.luxuryfashion.com/v1";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Handle errors
    return Promise.reject(error);
  }
);
```

**api/product.service.ts:**

```typescript
import { apiClient } from "./client";
import { Product, ProductFilters } from "../../types/models/Product";

export const ProductService = {
  getProducts: async (filters?: ProductFilters) => {
    return apiClient.get<Product[]>("/products", { params: filters });
  },

  getProductById: async (id: string) => {
    return apiClient.get<Product>(`/products/${id}`);
  },

  getFeaturedProducts: async () => {
    return apiClient.get<Product[]>("/products/featured");
  },

  searchProducts: async (query: string) => {
    return apiClient.get<Product[]>("/products", {
      params: { search: query },
    });
  },
};
```

---

### 5. `src/theme/` - Theme Configuration

**index.ts:**

```typescript
export const theme = {
  colors: {
    primary: "#0E0E0E",
    ivory: "#F7F5F2",
    softGray: "#8B8B8B",
    mutedGold: "#C9B37E",
    background: {
      primary: "#121212",
      secondary: "#1A1A1A",
      elevated: "#242424",
    },
    text: {
      primary: "#F5F1E8",
      secondary: "#C4C0B8",
      muted: "#8B8B8B",
    },
  },
  typography: {
    fontFamily: {
      heading: "PlayfairDisplay-Regular",
      headingBold: "PlayfairDisplay-Bold",
      body: "Inter-Regular",
      bodyBold: "Inter-Bold",
    },
    fontSize: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      "2xl": 24,
      "3xl": 30,
      "4xl": 36,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.6,
      relaxed: 1.8,
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    "2xl": 48,
    "3xl": 64,
  },
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    full: 9999,
  },
  shadows: {
    sm: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
  },
};
```

---

## 📦 Dependencies (package.json)

```json
{
  "name": "luxury-fashion-mobile",
  "version": "1.0.0",
  "scripts": {
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "start": "react-native start",
    "test": "jest",
    "lint": "eslint ."
  },
  "dependencies": {
    "react": "18.2.0",
    "react-native": "0.73.0",
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/stack": "^6.3.20",
    "@react-navigation/bottom-tabs": "^6.5.11",
    "@reduxjs/toolkit": "^2.0.1",
    "react-redux": "^9.0.4",
    "axios": "^1.6.2",
    "@react-native-firebase/app": "^19.0.0",
    "@react-native-firebase/auth": "^19.0.0",
    "@react-native-firebase/messaging": "^19.0.0",
    "react-native-vector-icons": "^10.0.3",
    "react-native-gesture-handler": "^2.14.0",
    "react-native-reanimated": "^3.6.1",
    "react-native-safe-area-context": "^4.8.2",
    "react-native-screens": "^3.29.0",
    "react-native-image-picker": "^7.1.0",
    "react-native-fast-image": "^8.6.3",
    "@react-native-async-storage/async-storage": "^1.21.0",
    "react-native-keychain": "^8.1.2"
  },
  "devDependencies": {
    "@babel/core": "^7.23.5",
    "@babel/preset-env": "^7.23.5",
    "@babel/runtime": "^7.23.5",
    "@react-native/babel-preset": "^0.73.18",
    "@react-native/eslint-config": "^0.73.1",
    "@react-native/metro-config": "^0.73.2",
    "@react-native/typescript-config": "^0.73.1",
    "@types/react": "^18.2.45",
    "@types/react-test-renderer": "^18.0.7",
    "babel-jest": "^29.7.0",
    "eslint": "^8.56.0",
    "jest": "^29.7.0",
    "prettier": "^3.1.1",
    "typescript": "^5.3.3"
  }
}
```

---

## 🚀 Hướng Dẫn Setup

### 1. Khởi tạo dự án

```bash
# Tạo project React Native mới
npx react-native@latest init LuxuryFashion --template react-native-template-typescript

# Di chuyển vào thư mục
cd LuxuryFashion

# Cài đặt dependencies
npm install
```

### 2. Cấu hình Android

```bash
# Mở Android Studio
cd android
./gradlew clean

# Chạy trên Android
cd ..
npm run android
```

### 3. Cấu hình iOS

```bash
# Cài đặt CocoaPods
cd ios
pod install

# Chạy trên iOS
cd ..
npm run ios
```

### 4. Cấu hình Firebase

1. Tạo project Firebase
2. Download `google-services.json` → `android/app/`
3. Download `GoogleService-Info.plist` → `ios/`

---

## 📝 Ghi Chú

- Cấu trúc này tổ chức giống Android Studio để dễ quản lý
- Mỗi screen có thư mục riêng với components con
- Services tách biệt giống Services trong Android
- Navigation tương tự Intent/Navigation trong Android
- Theme centralized giống styles.xml và colors.xml

Cấu trúc này giúp developer Android dễ dàng làm quen và phát triển ứng dụng React Native!
