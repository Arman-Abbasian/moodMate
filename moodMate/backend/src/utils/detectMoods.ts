export function detectMood(text: string): string {
  const moods: Record<string, string[]> = {
    استرسی: ['نگران', 'دلشوره', 'استرس', 'فشار', 'عصبی', 'اضطراب'],
    غمگین: ['ناراحت', 'اشک', 'تنهایی', 'غمگین', 'غم', 'بی‌انگیزه'],
    شاد: ['شاد', 'خوشحال', 'لبخند', 'هیجان‌زده', 'امیدوار'],
    خسته: ['خسته', 'بی‌حوصله', 'کسل', 'خوابم', 'کوفتگی'],
  }

  const scores: Record<string, number> = {}

  Object.entries(moods).forEach(([mood, keywords]) => {
    scores[mood] = keywords.filter((word) => text.includes(word)).length
  })

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
  return sorted[0][1] > 0 ? sorted[0][0] : 'خنثی'
}
