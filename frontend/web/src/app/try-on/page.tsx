'use client';

import { useState } from 'react';
import { UserLayout } from '@/components/layout';

export default function AITryOnPage() {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const products = [
    { id: '1', name: 'Đầm Lụa Dạ Hội', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&q=80', price: '$2,400' },
    { id: '2', name: 'Áo Blazer Cashmere', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&q=80', price: '$1,290' },
    { id: '3', name: 'Áo Khoác Len Cổ Điển', image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=200&q=80', price: '$1,850' },
    { id: '4', name: 'Bộ Vest May Đo', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=200&q=80', price: '$2,800' },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTryOn = async () => {
    if (!userImage || !selectedProduct) return;
    
    setIsProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      setResultImage(userImage); // In real implementation, this would be the AI result
      setIsProcessing(false);
    }, 3000);
  };

  return (
    <UserLayout>
      <main className="pt-32 pb-20 px-4 md:px-12 max-w-[1400px] mx-auto min-h-screen">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-muted-gold text-xs uppercase tracking-[0.3em] mb-4">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Công nghệ AI thế hệ mới
          </div>
          <h1 className="font-heading text-5xl md:text-6xl text-white mb-4">
            Thử Đồ Ảo AI
          </h1>
          <p className="text-gray-400 font-light max-w-lg mx-auto">
            Trải nghiệm thử đồ trực tuyến với công nghệ AI tiên tiến. Xem bạn trông như thế nào trong trang phục mới.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Image Upload */}
          <div className="bg-[#141417] rounded-2xl p-6 border border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>
            <h2 className="font-heading text-2xl text-white mb-6 relative z-10">Ảnh Của Bạn</h2>
            
            <div className="relative z-10">
              {userImage ? (
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#1A1A1D]">
                  <img src={userImage} alt="Your photo" className="w-full h-full object-cover" />
                  <button 
                    onClick={() => setUserImage(null)}
                    className="absolute top-3 right-3 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <label className="block aspect-[3/4] rounded-xl border-2 border-dashed border-white/20 hover:border-muted-gold/50 transition-colors cursor-pointer bg-[#1A1A1D]/50 flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-muted-gold/10 flex items-center justify-center">
                    <svg className="w-8 h-8 text-muted-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-medium mb-1">Tải ảnh lên</p>
                    <p className="text-gray-500 text-sm">hoặc kéo thả vào đây</p>
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                    className="hidden" 
                  />
                </label>
              )}
            </div>
          </div>

          {/* AI Result */}
          <div className="bg-[#141417] rounded-2xl p-6 border border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 pointer-events-none"></div>
            <h2 className="font-heading text-2xl text-white mb-6 relative z-10">Kết Quả AI</h2>
            
            <div className="relative z-10 aspect-[3/4] rounded-xl bg-[#1A1A1D]/50 border border-white/5 flex items-center justify-center overflow-hidden">
              {isProcessing ? (
                <div className="text-center">
                  <div className="w-16 h-16 border-2 border-muted-gold/30 border-t-muted-gold rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-400">Đang xử lý...</p>
                </div>
              ) : resultImage ? (
                <img src={resultImage} alt="AI Result" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center px-6">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-sm">
                    Tải ảnh và chọn trang phục để xem kết quả AI
                  </p>
                </div>
              )}
            </div>

            {userImage && selectedProduct && (
              <button 
                onClick={handleTryOn}
                disabled={isProcessing}
                className="w-full mt-6 bg-gradient-to-r from-muted-gold to-[#d4a853] text-charcoal py-4 rounded-xl font-bold uppercase tracking-wider hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Đang Xử Lý...' : 'Thử Ngay Với AI'}
              </button>
            )}
          </div>

          {/* Product Selection */}
          <div className="bg-[#141417] rounded-2xl p-6 border border-white/5">
            <h2 className="font-heading text-2xl text-white mb-6">Chọn Trang Phục</h2>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {products.map((product) => (
                <div 
                  key={product.id}
                  onClick={() => setSelectedProduct(product.id)}
                  className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                    selectedProduct === product.id 
                      ? 'bg-muted-gold/10 border border-muted-gold/50' 
                      : 'bg-[#1A1A1D] border border-transparent hover:border-white/10'
                  }`}
                >
                  <div className="w-16 h-20 rounded-lg overflow-hidden bg-white flex-shrink-0">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium text-sm truncate">{product.name}</h3>
                    <p className="text-muted-gold text-sm mt-1">{product.price}</p>
                  </div>
                  {selectedProduct === product.id && (
                    <div className="w-6 h-6 rounded-full bg-muted-gold flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-muted-gold/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-muted-gold font-heading text-xl">1</span>
            </div>
            <h3 className="text-white font-medium mb-2">Tải Ảnh Lên</h3>
            <p className="text-gray-500 text-sm">Chọn ảnh chân dung rõ nét của bạn</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-muted-gold/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-muted-gold font-heading text-xl">2</span>
            </div>
            <h3 className="text-white font-medium mb-2">Chọn Trang Phục</h3>
            <p className="text-gray-500 text-sm">Chọn sản phẩm bạn muốn thử</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-muted-gold/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-muted-gold font-heading text-xl">3</span>
            </div>
            <h3 className="text-white font-medium mb-2">Xem Kết Quả</h3>
            <p className="text-gray-500 text-sm">AI sẽ tạo hình ảnh bạn trong trang phục</p>
          </div>
        </div>
      </main>
    </UserLayout>
  );
}
