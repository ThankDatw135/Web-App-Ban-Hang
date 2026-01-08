from PIL import Image
import io
import httpx
from typing import Tuple
from loguru import logger

from app.core.config import settings


class ImageProcessor:
    """Image processing utilities for the try-on service."""
    
    def __init__(self, max_size: int = None):
        self.max_size = max_size or settings.MAX_IMAGE_SIZE
    
    async def download_image(self, url: str) -> Image.Image:
        """Download an image from a URL."""
        async with httpx.AsyncClient() as client:
            response = await client.get(url, timeout=30.0)
            response.raise_for_status()
            return Image.open(io.BytesIO(response.content))
    
    def preprocess(self, image: Image.Image) -> Image.Image:
        """Preprocess image for the model."""
        # Convert to RGB
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Resize if too large
        if max(image.size) > self.max_size:
            image = self._resize_maintaining_aspect(image, self.max_size)
        
        return image
    
    def _resize_maintaining_aspect(
        self, 
        image: Image.Image, 
        max_size: int
    ) -> Image.Image:
        """Resize image maintaining aspect ratio."""
        width, height = image.size
        
        if width > height:
            new_width = max_size
            new_height = int(height * max_size / width)
        else:
            new_height = max_size
            new_width = int(width * max_size / height)
        
        return image.resize((new_width, new_height), Image.Resampling.LANCZOS)
    
    def to_bytes(self, image: Image.Image, format: str = "JPEG") -> bytes:
        """Convert PIL Image to bytes."""
        buffer = io.BytesIO()
        image.save(buffer, format=format, quality=90)
        buffer.seek(0)
        return buffer.getvalue()
    
    def combine_images(
        self, 
        user_image: Image.Image, 
        product_images: list
    ) -> Image.Image:
        """Combine user and product images for visualization."""
        # Simple side-by-side combination for placeholder
        total_width = user_image.width
        max_height = user_image.height
        
        for img in product_images:
            total_width += img.width
            max_height = max(max_height, img.height)
        
        combined = Image.new('RGB', (total_width, max_height), (255, 255, 255))
        
        x_offset = 0
        combined.paste(user_image, (x_offset, 0))
        x_offset += user_image.width
        
        for img in product_images:
            combined.paste(img, (x_offset, 0))
            x_offset += img.width
        
        return combined
