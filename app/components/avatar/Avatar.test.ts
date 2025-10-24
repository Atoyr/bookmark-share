// Avatar.spec.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { nextTick } from 'vue';
import Avatar from './Avatar.vue';

// reka-ui のモック
vi.mock('reka-ui', () => ({
  AvatarRoot: {
    name: 'AvatarRoot',
    template: '<div data-test="avatar-root" :class="$attrs.class"><slot /></div>',
  },
  AvatarImage: {
    name: 'AvatarImage',
    template: '<img data-test="avatar-image" v-bind="$attrs" />',
  },
  AvatarFallback: {
    name: 'AvatarFallback',
    template: '<div data-test="avatar-fallback" :class="$attrs.class"><slot /></div>',
  },
}));

// utils のモック
vi.mock('@/lib/utils', () => ({
  cn: (...classes: any[]) => classes.filter(Boolean).join(' '),
}));

// variants のモック
vi.mock('.', () => ({
  avatarRootVariants: vi.fn((props) => `avatar-root-${props.size}`),
  avatarFallbackVariants: vi.fn((props) => `avatar-fallback-${props.fallbackColor}-${props.size}`),
}));

describe('Avatar Component', () => {
  let wrapper: VueWrapper;

  const defaultProps = {
    size: 'md' as const,
    delayMs: 600,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('基本的なレンダリング', () => {
    it('AvatarRoot がレンダリングされること', () => {
      wrapper = mount(Avatar, {
        props: defaultProps,
      });

      const avatarRoot = wrapper.find('[data-test="avatar-root"]');
      expect(avatarRoot.exists()).toBe(true);
    });

    it('data-slot 属性が正しく設定されること', () => {
      wrapper = mount(Avatar, {
        props: defaultProps,
      });

      expect(wrapper.find('[data-slot="avatar"]').exists()).toBe(true);
      expect(wrapper.find('[data-slot="avatar-fallback"]').exists()).toBe(true);
    });
  });

  describe('画像の表示', () => {
    it('src が渡された場合、AvatarImage がレンダリングされること', () => {
      wrapper = mount(Avatar, {
        props: {
          ...defaultProps,
          src: 'https://example.com/avatar.jpg',
        },
      });

      const avatarImage = wrapper.find('[data-test="avatar-image"]');
      expect(avatarImage.exists()).toBe(true);
      expect(avatarImage.attributes('src')).toBe('https://example.com/avatar.jpg');
    });

    it('src が渡されない場合、AvatarImage がレンダリングされないこと', () => {
      wrapper = mount(Avatar, {
        props: defaultProps,
      });

      const avatarImage = wrapper.find('[data-test="avatar-image"]');
      expect(avatarImage.exists()).toBe(false);
    });

    it('crossOrigin プロパティが正しく渡されること', () => {
      wrapper = mount(Avatar, {
        props: {
          ...defaultProps,
          src: 'https://example.com/avatar.jpg',
          crossOrigin: 'anonymous',
        },
      });

      const avatarImage = wrapper.find('[data-test="avatar-image"]');
      expect(avatarImage.attributes('cross-origin')).toBe('anonymous');
    });

    it('referrerPolicy プロパティが正しく渡されること', () => {
      wrapper = mount(Avatar, {
        props: {
          ...defaultProps,
          src: 'https://example.com/avatar.jpg',
          referrerPolicy: 'no-referrer',
        },
      });

      const avatarImage = wrapper.find('[data-test="avatar-image"]');
      expect(avatarImage.attributes('referrer-policy')).toBe('no-referrer');
    });
  });

  describe('フォールバック表示', () => {
    it('AvatarFallback が常にレンダリングされること', () => {
      wrapper = mount(Avatar, {
        props: defaultProps,
      });

      const avatarFallback = wrapper.find('[data-test="avatar-fallback"]');
      expect(avatarFallback.exists()).toBe(true);
    });

    it('fallback プロパティが渡された場合、テキストが表示されること', () => {
      wrapper = mount(Avatar, {
        props: {
          ...defaultProps,
          fallback: 'JD',
        },
      });

      expect(wrapper.text()).toContain('JD');
    });

    it('fallback プロパティがない場合、スロットコンテンツが表示されること', () => {
      wrapper = mount(Avatar, {
        props: defaultProps,
        slots: {
          default: '<span>Custom Fallback</span>',
        },
      });

      expect(wrapper.text()).toContain('Custom Fallback');
    });

    it('delayMs プロパティが正しく渡されること', () => {
      wrapper = mount(Avatar, {
        props: {
          ...defaultProps,
          delayMs: 1000,
        },
      });

      const avatarFallback = wrapper.findComponent({ name: 'AvatarFallback' });
      expect(avatarFallback.attributes('delay-ms')).toBe('1000');
    });
  });

  describe('スタイリング', () => {
    it('size プロパティに応じた AvatarRoot のクラスが適用されること', () => {
      wrapper = mount(Avatar, {
        props: {
          ...defaultProps,
          size: 'lg',
        },
      });

      const avatarRoot = wrapper.find('[data-test="avatar-root"]');
      expect(avatarRoot.classes()).toContain('avatar-root-lg');
    });

    it('fallbackColor プロパティに応じた AvatarFallback のクラスが適用されること', () => {
      wrapper = mount(Avatar, {
        props: {
          ...defaultProps,
          fallbackColor: 'primary',
        },
      });

      const avatarFallback = wrapper.find('[data-test="avatar-fallback"]');
      expect(avatarFallback.classes()).toContain('avatar-fallback-primary-md');
    });

    it('複数のサイズバリエーションが正しく適用されること', () => {
      const sizes = ['sm', 'md', 'lg', 'xl'];
      
      sizes.forEach((size) => {
        wrapper = mount(Avatar, {
          props: {
            ...defaultProps,
            size: size as any,
          },
        });

        const avatarRoot = wrapper.find('[data-test="avatar-root"]');
        expect(avatarRoot.classes()).toContain(`avatar-root-${size}`);
      });
    });
  });

  describe('複合的なシナリオ', () => {
    it('画像とフォールバックの両方が設定された場合、両方がレンダリングされること', () => {
      wrapper = mount(Avatar, {
        props: {
          ...defaultProps,
          src: 'https://example.com/avatar.jpg',
          fallback: 'JD',
        },
      });

      expect(wrapper.find('[data-test="avatar-image"]').exists()).toBe(true);
      expect(wrapper.find('[data-test="avatar-fallback"]').exists()).toBe(true);
      expect(wrapper.text()).toContain('JD');
    });

    it('すべてのプロパティが同時に設定できること', () => {
      wrapper = mount(Avatar, {
        props: {
          src: 'https://example.com/avatar.jpg',
          size: 'lg',
          crossOrigin: 'anonymous',
          referrerPolicy: 'no-referrer',
          delayMs: 1000,
          fallback: 'JD',
          fallbackColor: 'primary',
        },
      });

      expect(wrapper.find('[data-test="avatar-root"]').exists()).toBe(true);
      expect(wrapper.find('[data-test="avatar-image"]').exists()).toBe(true);
      expect(wrapper.find('[data-test="avatar-fallback"]').exists()).toBe(true);
    });
  });
});
