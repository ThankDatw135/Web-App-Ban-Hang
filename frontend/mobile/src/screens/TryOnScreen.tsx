import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {colors, spacing, textStyles} from '../theme';

export default function TryOnScreen() {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSelectPhoto = () => {
    // TODO: Implement image picker
    console.log('Select photo');
  };

  const handleTryOn = () => {
    if (!userImage || !selectedProduct) return;
    setIsProcessing(true);
    // TODO: Call AI service
    setTimeout(() => {
      setIsProcessing(false);
      setResultImage('placeholder');
    }, 2000);
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.label}>AI POWERED</Text>
        <Text style={styles.title}>Virtual Try-On</Text>
        <Text style={styles.description}>
          Upload your photo and select a product to see how it looks on you.
        </Text>
      </View>

      {/* Step 1: Upload Photo */}
      <View style={styles.step}>
        <Text style={styles.stepNumber}>01</Text>
        <Text style={styles.stepTitle}>Upload Your Photo</Text>
        
        <TouchableOpacity 
          style={styles.uploadArea}
          onPress={handleSelectPhoto}
        >
          {userImage ? (
            <View style={styles.uploadedImage} />
          ) : (
            <>
              <View style={styles.uploadIcon} />
              <Text style={styles.uploadText}>Tap to upload photo</Text>
              <Text style={styles.uploadHint}>Full-body photo works best</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Step 2: Select Product */}
      <View style={styles.step}>
        <Text style={styles.stepNumber}>02</Text>
        <Text style={styles.stepTitle}>Select Product</Text>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.productScroll}
        >
          {[1, 2, 3, 4].map((i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.productItem,
                selectedProduct === String(i) && styles.productItemSelected,
              ]}
              onPress={() => setSelectedProduct(String(i))}
            >
              <View style={styles.productItemImage} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Generate Button */}
      <TouchableOpacity
        style={[
          styles.generateButton,
          (!userImage || !selectedProduct) && styles.generateButtonDisabled,
        ]}
        onPress={handleTryOn}
        disabled={!userImage || !selectedProduct || isProcessing}
      >
        <Text style={styles.generateButtonText}>
          {isProcessing ? 'PROCESSING...' : 'GENERATE TRY-ON'}
        </Text>
      </TouchableOpacity>

      {/* Result */}
      {resultImage && (
        <View style={styles.resultSection}>
          <Text style={styles.stepNumber}>03</Text>
          <Text style={styles.stepTitle}>Your Look</Text>
          <View style={styles.resultImage} />
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>SAVE TO GALLERY</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBg,
  },
  content: {
    paddingBottom: spacing['3xl'],
  },
  header: {
    paddingHorizontal: spacing.screenHorizontal,
    paddingTop: spacing['2xl'],
    paddingBottom: spacing.xl,
  },
  label: {
    color: colors.mutedGold,
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  title: {
    ...textStyles.h1,
    color: colors.ivory,
    marginTop: spacing.xs,
  },
  description: {
    ...textStyles.body,
    color: colors.softGray,
    marginTop: spacing.sm,
  },

  // Steps
  step: {
    paddingHorizontal: spacing.screenHorizontal,
    marginTop: spacing.xl,
  },
  stepNumber: {
    ...textStyles.h1,
    color: colors.mutedGold,
    opacity: 0.5,
  },
  stepTitle: {
    ...textStyles.h3,
    color: colors.ivory,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },

  // Upload
  uploadArea: {
    aspectRatio: 3 / 4,
    backgroundColor: colors.darkSurface,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.softGray,
  },
  uploadIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.border,
    marginBottom: spacing.md,
  },
  uploadText: {
    ...textStyles.body,
    color: colors.ivory,
  },
  uploadHint: {
    ...textStyles.caption,
    color: colors.softGray,
    marginTop: spacing.xs,
  },

  // Products
  productScroll: {
    marginHorizontal: -spacing.screenHorizontal,
    paddingHorizontal: spacing.screenHorizontal,
  },
  productItem: {
    width: 100,
    marginRight: spacing.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  productItemSelected: {
    borderColor: colors.mutedGold,
  },
  productItemImage: {
    aspectRatio: 3 / 4,
    backgroundColor: colors.darkSurface,
  },

  // Generate
  generateButton: {
    marginHorizontal: spacing.screenHorizontal,
    marginTop: spacing['2xl'],
    backgroundColor: colors.mutedGold,
    paddingVertical: spacing.buttonPaddingV,
    alignItems: 'center',
  },
  generateButtonDisabled: {
    backgroundColor: colors.softGray,
    opacity: 0.5,
  },
  generateButtonText: {
    ...textStyles.button,
    color: colors.charcoal,
  },

  // Result
  resultSection: {
    paddingHorizontal: spacing.screenHorizontal,
    marginTop: spacing['2xl'],
  },
  resultImage: {
    aspectRatio: 3 / 4,
    backgroundColor: colors.darkSurface,
    marginBottom: spacing.lg,
  },
  saveButton: {
    backgroundColor: colors.ivory,
    paddingVertical: spacing.buttonPaddingV,
    alignItems: 'center',
  },
  saveButtonText: {
    ...textStyles.button,
    color: colors.charcoal,
  },
});
