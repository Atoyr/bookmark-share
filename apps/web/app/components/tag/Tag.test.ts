import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Tag from './Tag.vue' // パスはあなたの構成に合わせてください

// ✅ tagVariants は実体を使う（統合テスト）
/* no mock for './tagVariants.ts' */

// ⚠️ cn はここでは結合専用のモックにして、クラス結合の引数を検証しやすくする
vi.mock('@/lib/utils', () => ({
  cn: vi.fn((...args: string[]) => args.filter(Boolean).join(' ')),
}))

describe('Tag.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('テキストが表示される', () => {
    const wrapper = mount(Tag, { props: { name: 'Hello' } })
    expect(wrapper.text()).toBe('Hello')
  })

  it('デフォルト色（gray）が適用される', () => {
    const wrapper = mount(Tag, { props: { name: 'Default' } })

    // base class の一部が含まれていること
    expect(wrapper.classes()).toContain('inline-flex')
    expect(wrapper.classes()).toContain('rounded-full')

    // defaultVariants.color = 'gray'
    expect(wrapper.classes()).toContain('bg-slate-200')
    expect(wrapper.classes()).toContain('dark:bg-slate-700')
    expect(wrapper.classes()).toContain('text-black')
    expect(wrapper.classes()).toContain('dark:text-white')
  })

  it('指定色（blue）が適用される', () => {
    const wrapper = mount(Tag, { props: { name: 'Blue', color: 'blue' } })

    // blue のクラスが含まれ、gray の主要クラスは含まれない
    expect(wrapper.classes()).toContain('bg-blue-200')
    expect(wrapper.classes()).toContain('dark:bg-blue-700')
    expect(wrapper.classes()).toContain('text-black')
    expect(wrapper.classes()).toContain('dark:text-white')

    expect(wrapper.classes()).not.toContain('bg-slate-200')
    expect(wrapper.classes()).not.toContain('dark:bg-slate-700')
  })

  it('props.class がマージされる (cn 経由)', async () => {
    const wrapper = mount(Tag, { props: { name: 'Custom', class: 'custom-class' } })
    expect(wrapper.classes()).toContain('custom-class')

    const { cn } = await import('@/lib/utils')
    // tagVariants の返却（base + default gray）と 'custom-class' が渡されていることを確認
    expect(cn).toHaveBeenCalledTimes(1)
    const [arg1, arg2] = (cn as any).mock.calls[0] // [ classesFromTagVariants, 'custom-class' ]
    expect(typeof arg1).toBe('string')
    expect(arg2).toBe('custom-class')
  })

  it('data-[state=active] 系のユーティリティがクラスに含まれている（Tailwind バリアント）', () => {
    const wrapper = mount(Tag, { props: { name: 'Active' } })
    const classStr = wrapper.find('div').attributes('class') ?? ''
    expect(classStr).toContain('data-[state=active]:ring-2')
    expect(classStr).toContain('data-[state=active]:ring-offset-2')
    expect(classStr).toContain('data-[state=active]:ring-ring')
  })
})
