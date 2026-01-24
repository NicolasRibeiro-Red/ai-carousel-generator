import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Carousel, IdeaFormData, CarouselStore, HookDetailed } from '@/types';

const DEFAULT_FORM_DATA: IdeaFormData = {
  ideia: '',
  objetivo: 'Educar',
  tom: 'Direto',
  emojis: 'Poucos',
  slides_count: 8,
  auto_slides: true, // Default to automatic
};

export const useCarouselStore = create<CarouselStore>()(
  persist(
    (set) => ({
      // Form data
      formData: DEFAULT_FORM_DATA,
      setFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
      resetFormData: () => set({ formData: DEFAULT_FORM_DATA }),

      // Hooks
      hooks: [],
      hooksDetailed: [],
      setHooks: (hooks, hooksDetailed) =>
        set({ hooks, hooksDetailed: hooksDetailed || [] }),
      selectedHook: null,
      setSelectedHook: (hook) => set({ selectedHook: hook }),
      hookRegenerations: 0,
      incrementHookRegenerations: () =>
        set((state) => ({ hookRegenerations: state.hookRegenerations + 1 })),
      resetHookRegenerations: () => set({ hookRegenerations: 0 }),

      // Carousel
      carousel: null,
      setCarousel: (carousel) => set({ carousel }),
      updateSlideText: (slideNumber, newText) =>
        set((state) => {
          if (!state.carousel) return state;
          const updatedSlides = state.carousel.slides.map((slide) =>
            slide.numero === slideNumber
              ? { ...slide, texto: newText }
              : slide
          );
          return {
            carousel: {
              ...state.carousel,
              slides: updatedSlides,
            },
          };
        }),
      deleteSlide: (slideNumber) =>
        set((state) => {
          if (!state.carousel) return state;
          // Remove o slide e renumera os restantes
          const updatedSlides = state.carousel.slides
            .filter((slide) => slide.numero !== slideNumber)
            .map((slide, index) => ({
              ...slide,
              numero: index + 1,
            }));
          return {
            carousel: {
              ...state.carousel,
              slides: updatedSlides,
            },
          };
        }),

      // Customization
      profilePhoto: null,
      setProfilePhoto: (url) => set({ profilePhoto: url }),
      displayName: '',
      setDisplayName: (name) => set({ displayName: name }),
      username: '',
      setUsername: (username) => set({ username }),
      verified: true,
      setVerified: (verified) => set({ verified }),
      theme: 'dark',
      setTheme: (theme) => set({ theme }),

      // Loading states
      isGeneratingHooks: false,
      setIsGeneratingHooks: (loading) => set({ isGeneratingHooks: loading }),
      isGeneratingCarousel: false,
      setIsGeneratingCarousel: (loading) =>
        set({ isGeneratingCarousel: loading }),

      // Reset all
      resetAll: () =>
        set({
          formData: DEFAULT_FORM_DATA,
          hooks: [],
          hooksDetailed: [],
          selectedHook: null,
          hookRegenerations: 0,
          carousel: null,
          isGeneratingHooks: false,
          isGeneratingCarousel: false,
        }),
    }),
    {
      name: 'breathai-carousel-storage',
      partialize: (state) => ({
        // Only persist these fields
        profilePhoto: state.profilePhoto,
        displayName: state.displayName,
        username: state.username,
        verified: state.verified,
        theme: state.theme,
      }),
    }
  )
);
