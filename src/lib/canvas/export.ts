import html2canvas from 'html2canvas';
import JSZip from 'jszip';
import type { Slide, TwitterTheme } from '@/types';

interface ExportOptions {
  slides: Slide[];
  theme: TwitterTheme;
  profilePhoto: string | null;
  displayName: string;
  username: string;
  verified: boolean;
}

// Instagram carousel dimensions
const SLIDE_WIDTH = 1080;
const SLIDE_HEIGHT = 1350;

// Twitter theme colors
const THEMES = {
  light: {
    background: '#FFFFFF',
    cardBg: '#FFFFFF',
    text: '#0F1419',
    textSecondary: '#536471',
    border: '#EFF3F4',
    metrics: '#536471',
  },
  dim: {
    background: '#15202B',
    cardBg: '#15202B',
    text: '#F7F9F9',
    textSecondary: '#8B98A5',
    border: '#38444D',
    metrics: '#8B98A5',
  },
  dark: {
    background: '#000000',
    cardBg: '#000000',
    text: '#E7E9EA',
    textSecondary: '#71767B',
    border: '#2F3336',
    metrics: '#71767B',
  },
};

// Generate random engagement metrics for authenticity
function generateMetrics() {
  const views = Math.floor(Math.random() * 900000) + 100000;
  const likes = Math.floor(views * (Math.random() * 0.05 + 0.02));
  const retweets = Math.floor(likes * (Math.random() * 0.3 + 0.1));
  const replies = Math.floor(retweets * (Math.random() * 0.5 + 0.2));
  const bookmarks = Math.floor(likes * (Math.random() * 0.1 + 0.02));

  return {
    views: formatNumber(views),
    likes: formatNumber(likes),
    retweets: formatNumber(retweets),
    replies: formatNumber(replies),
    bookmarks: formatNumber(bookmarks),
  };
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
}

// Render a single slide to blob (for individual download/share)
export async function renderSlideToBlob(
  slide: Slide,
  totalSlides: number,
  theme: TwitterTheme,
  profilePhoto: string | null,
  displayName: string,
  username: string,
  verified: boolean = true
): Promise<Blob> {
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = '-9999px';
  container.style.top = '0';
  document.body.appendChild(container);

  try {
    const canvas = await renderSlideToCanvas(
      slide,
      totalSlides,
      theme,
      profilePhoto,
      displayName,
      username,
      verified,
      container
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Failed to create blob'));
        },
        'image/png',
        0.95
      );
    });
  } finally {
    document.body.removeChild(container);
  }
}

export async function exportSlidesToZip(options: ExportOptions): Promise<void> {
  const { slides, theme, profilePhoto, displayName, username, verified } = options;
  const zip = new JSZip();

  // Create a hidden container for rendering
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = '-9999px';
  container.style.top = '0';
  document.body.appendChild(container);

  try {
    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i];
      const canvas = await renderSlideToCanvas(
        slide,
        slides.length,
        theme,
        profilePhoto,
        displayName,
        username,
        verified,
        container
      );

      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error('Failed to create blob'));
          },
          'image/png',
          0.95
        );
      });

      // Add to zip
      zip.file(`breathai_slide_${slide.numero}.png`, blob);
    }

    // Generate zip file
    const zipBlob = await zip.generateAsync({ type: 'blob' });

    // Trigger download
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `breathai_carrossel_${Date.now()}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } finally {
    // Clean up
    document.body.removeChild(container);
  }
}

// SVG icons as data URIs
const VERIFIED_BADGE_SVG = `<svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681.132-.637.075-1.299-.165-1.903.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246-5.683 6.206z" fill="#1D9BF0"/>
</svg>`;

const REPLY_ICON = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"/></svg>`;

const RETWEET_ICON = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"/></svg>`;

const LIKE_ICON = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"/></svg>`;

const BOOKMARK_ICON = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"/></svg>`;

const SHARE_ICON = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"/></svg>`;

const VIEWS_ICON = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"/></svg>`;

async function renderSlideToCanvas(
  slide: Slide,
  totalSlides: number,
  theme: TwitterTheme,
  profilePhoto: string | null,
  displayName: string,
  username: string,
  verified: boolean,
  container: HTMLElement
): Promise<HTMLCanvasElement> {
  const colors = THEMES[theme];
  const metrics = generateMetrics();

  // Create slide element with Twitter post style
  const slideElement = document.createElement('div');
  slideElement.style.cssText = `
    width: ${SLIDE_WIDTH}px;
    height: ${SLIDE_HEIGHT}px;
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: ${colors.background};
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    padding: 60px;
    box-sizing: border-box;
  `;

  // Twitter card container
  const card = document.createElement('div');
  card.style.cssText = `
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: ${colors.cardBg};
    border: 1px solid ${colors.border};
    border-radius: 16px;
    padding: 20px;
    overflow: hidden;
  `;

  // Header: Avatar + Name + Username + Verified
  const header = document.createElement('div');
  header.style.cssText = `
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 16px;
  `;

  // Avatar
  const avatar = document.createElement('div');
  avatar.style.cssText = `
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: ${colors.border};
    overflow: hidden;
    flex-shrink: 0;
  `;

  if (profilePhoto) {
    const img = document.createElement('img');
    img.src = profilePhoto;
    img.style.cssText = 'width: 100%; height: 100%; object-fit: cover;';
    avatar.appendChild(img);
  } else {
    avatar.style.cssText += `
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: bold;
      color: ${colors.textSecondary};
    `;
    avatar.textContent = (displayName || username).slice(0, 2).toUpperCase();
  }

  // Name container
  const nameContainer = document.createElement('div');
  nameContainer.style.cssText = `
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
  `;

  // Name row with verified badge
  const nameRow = document.createElement('div');
  nameRow.style.cssText = `
    display: flex;
    align-items: center;
    gap: 4px;
  `;

  const nameEl = document.createElement('span');
  nameEl.style.cssText = `
    font-size: 17px;
    font-weight: 700;
    color: ${colors.text};
    line-height: 1.3;
  `;
  nameEl.textContent = displayName || username;
  nameRow.appendChild(nameEl);

  if (verified) {
    const badge = document.createElement('div');
    badge.style.cssText = 'width: 20px; height: 20px; flex-shrink: 0;';
    badge.innerHTML = VERIFIED_BADGE_SVG;
    nameRow.appendChild(badge);
  }

  // Username
  const usernameEl = document.createElement('span');
  usernameEl.style.cssText = `
    font-size: 15px;
    color: ${colors.textSecondary};
    line-height: 1.3;
  `;
  usernameEl.textContent = username.startsWith('@') ? username : `@${username}`;

  nameContainer.appendChild(nameRow);
  nameContainer.appendChild(usernameEl);

  header.appendChild(avatar);
  header.appendChild(nameContainer);
  card.appendChild(header);

  // Tweet content
  const content = document.createElement('div');
  content.style.cssText = `
    flex: 1;
    display: flex;
    align-items: center;
    padding: 20px 0;
  `;

  const text = document.createElement('p');
  text.style.cssText = `
    margin: 0;
    color: ${colors.text};
    font-weight: 400;
    line-height: 1.5;
    word-wrap: break-word;
  `;

  // Dynamic font size based on text length
  if (slide.texto.length > 200) {
    text.style.fontSize = '32px';
  } else if (slide.texto.length > 150) {
    text.style.fontSize = '38px';
  } else if (slide.texto.length > 100) {
    text.style.fontSize = '44px';
  } else if (slide.texto.length > 60) {
    text.style.fontSize = '52px';
  } else {
    text.style.fontSize = '60px';
  }

  text.textContent = slide.texto;
  content.appendChild(text);
  card.appendChild(content);

  // Timestamp
  const timestamp = document.createElement('div');
  timestamp.style.cssText = `
    font-size: 15px;
    color: ${colors.textSecondary};
    padding: 16px 0;
    border-bottom: 1px solid ${colors.border};
  `;
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  timestamp.textContent = `${displayHours}:${minutes} ${ampm} · ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
  card.appendChild(timestamp);

  // Views count
  const viewsRow = document.createElement('div');
  viewsRow.style.cssText = `
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 16px 0;
    border-bottom: 1px solid ${colors.border};
    font-size: 15px;
  `;

  const viewsNumber = document.createElement('span');
  viewsNumber.style.cssText = `font-weight: 700; color: ${colors.text};`;
  viewsNumber.textContent = metrics.views;

  const viewsLabel = document.createElement('span');
  viewsLabel.style.cssText = `color: ${colors.textSecondary};`;
  viewsLabel.textContent = ' Views';

  viewsRow.appendChild(viewsNumber);
  viewsRow.appendChild(viewsLabel);
  card.appendChild(viewsRow);

  // Metrics row
  const metricsRow = document.createElement('div');
  metricsRow.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid ${colors.border};
  `;

  const createMetricItem = (icon: string, value: string) => {
    const item = document.createElement('div');
    item.style.cssText = `
      display: flex;
      align-items: center;
      gap: 8px;
      color: ${colors.metrics};
    `;

    const iconEl = document.createElement('div');
    iconEl.style.cssText = 'width: 22px; height: 22px;';
    iconEl.innerHTML = icon;

    const valueEl = document.createElement('span');
    valueEl.style.cssText = 'font-size: 14px;';
    valueEl.textContent = value;

    item.appendChild(iconEl);
    item.appendChild(valueEl);
    return item;
  };

  metricsRow.appendChild(createMetricItem(REPLY_ICON, metrics.replies));
  metricsRow.appendChild(createMetricItem(RETWEET_ICON, metrics.retweets));
  metricsRow.appendChild(createMetricItem(LIKE_ICON, metrics.likes));
  metricsRow.appendChild(createMetricItem(BOOKMARK_ICON, metrics.bookmarks));
  metricsRow.appendChild(createMetricItem(SHARE_ICON, ''));

  card.appendChild(metricsRow);

  // Action buttons row
  const actionsRow = document.createElement('div');
  actionsRow.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 12px 0;
  `;

  const createActionButton = (icon: string) => {
    const btn = document.createElement('div');
    btn.style.cssText = `
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${colors.metrics};
    `;
    const iconEl = document.createElement('div');
    iconEl.style.cssText = 'width: 24px; height: 24px;';
    iconEl.innerHTML = icon;
    btn.appendChild(iconEl);
    return btn;
  };

  actionsRow.appendChild(createActionButton(REPLY_ICON));
  actionsRow.appendChild(createActionButton(RETWEET_ICON));
  actionsRow.appendChild(createActionButton(LIKE_ICON));
  actionsRow.appendChild(createActionButton(BOOKMARK_ICON));
  actionsRow.appendChild(createActionButton(SHARE_ICON));

  card.appendChild(actionsRow);
  slideElement.appendChild(card);

  // Slide indicator (bottom)
  const slideIndicator = document.createElement('div');
  slideIndicator.style.cssText = `
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
  `;

  for (let i = 1; i <= totalSlides; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      width: ${i === slide.numero ? '24px' : '8px'};
      height: 8px;
      border-radius: 4px;
      background-color: ${i === slide.numero ? '#1D9BF0' : colors.border};
      transition: width 0.2s;
    `;
    slideIndicator.appendChild(dot);
  }

  slideElement.appendChild(slideIndicator);

  // Add to container
  container.appendChild(slideElement);

  // Wait for any images to load
  await new Promise((resolve) => setTimeout(resolve, 150));

  // Render to canvas
  const canvas = await html2canvas(slideElement, {
    width: SLIDE_WIDTH,
    height: SLIDE_HEIGHT,
    scale: 1,
    backgroundColor: colors.background,
    useCORS: true,
    allowTaint: true,
  });

  // Remove element
  container.removeChild(slideElement);

  return canvas;
}

// Export individual slide
export async function exportSingleSlide(
  slide: Slide,
  totalSlides: number,
  theme: TwitterTheme,
  profilePhoto: string | null,
  displayName: string,
  username: string,
  verified: boolean = true
): Promise<void> {
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = '-9999px';
  container.style.top = '0';
  document.body.appendChild(container);

  try {
    const canvas = await renderSlideToCanvas(
      slide,
      totalSlides,
      theme,
      profilePhoto,
      displayName,
      username,
      verified,
      container
    );

    // Convert to blob and download
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `breathai_slide_${slide.numero}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      },
      'image/png',
      0.95
    );
  } finally {
    document.body.removeChild(container);
  }
}
