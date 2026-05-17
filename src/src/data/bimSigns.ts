export interface SignData {
  id: string;
  nameMalay: string;
  nameEnglish: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  icon?: string;
}

export interface UnitData {
  id: string;
  title: string;
  description: string;
  lessonCount: number;
  color: string;
  icon: string;
}

export const bimUnits: UnitData[] = [
{
  id: 'unit-1',
  title: 'ABJAD',
  description: 'Alphabet A-Z',
  lessonCount: 5,
  color: 'bg-primary',
  icon: 'A'
},
{
  id: 'unit-2',
  title: 'ANGKA',
  description: 'Numbers 1-10',
  lessonCount: 5,
  color: 'bg-secondary',
  icon: '1'
},
{
  id: 'unit-3',
  title: 'SALAM & SAPAAN',
  description: 'Greetings',
  lessonCount: 4,
  color: 'bg-accent',
  icon: '👋'
},
{
  id: 'unit-4',
  title: 'WARNA',
  description: 'Colors',
  lessonCount: 4,
  color: 'bg-pink-500',
  icon: '🎨'
},
{
  id: 'unit-5',
  title: 'ANGGOTA BADAN',
  description: 'Body Parts',
  lessonCount: 5,
  color: 'bg-purple-500',
  icon: '👁️'
},
{
  id: 'unit-6',
  title: 'KATA KERJA',
  description: 'Verbs',
  lessonCount: 6,
  color: 'bg-green-500',
  icon: '🏃'
},
{
  id: 'unit-7',
  title: 'KATA SIFAT',
  description: 'Adjectives',
  lessonCount: 4,
  color: 'bg-indigo-500',
  icon: '✨'
},
{
  id: 'unit-8',
  title: 'KELUARGA',
  description: 'Family',
  lessonCount: 5,
  color: 'bg-rose-500',
  icon: '👨‍👩‍👧'
}];


export const bimSigns: SignData[] = [
// ABJAD (Alphabet)
{
  id: 'a',
  nameMalay: 'A',
  nameEnglish: 'A',
  description: 'Fist closed, thumb resting on the side of the index finger.',
  category: 'ABJAD',
  difficulty: 'Easy',
  icon: '✊'
},
{
  id: 'b',
  nameMalay: 'B',
  nameEnglish: 'B',
  description: 'Fingers straight up, thumb folded across palm.',
  category: 'ABJAD',
  difficulty: 'Easy',
  icon: '✋'
},
{
  id: 'c',
  nameMalay: 'C',
  nameEnglish: 'C',
  description: 'Hand curved into a C shape.',
  category: 'ABJAD',
  difficulty: 'Easy',
  icon: '🫲'
},

// ANGKA (Numbers)
{
  id: '1',
  nameMalay: 'Satu',
  nameEnglish: 'One',
  description: 'Index finger pointing up, other fingers closed.',
  category: 'ANGKA',
  difficulty: 'Easy',
  icon: '☝️'
},
{
  id: '2',
  nameMalay: 'Dua',
  nameEnglish: 'Two',
  description: 'Index and middle fingers pointing up (V shape).',
  category: 'ANGKA',
  difficulty: 'Easy',
  icon: '✌️'
},

// SALAM (Greetings)
{
  id: 'hai',
  nameMalay: 'Hai',
  nameEnglish: 'Hello',
  description: 'Wave hand side to side.',
  category: 'SALAM & SAPAAN',
  difficulty: 'Easy',
  icon: '👋'
},
{
  id: 'terima-kasih',
  nameMalay: 'Terima Kasih',
  nameEnglish: 'Thank You',
  description: 'Fingertips to chin, then move hand forward and down.',
  category: 'SALAM & SAPAAN',
  difficulty: 'Medium',
  icon: '🙏'
},
{
  id: 'maaf',
  nameMalay: 'Maaf',
  nameEnglish: 'Sorry',
  description: 'Rub closed fist in a circle over the chest.',
  category: 'SALAM & SAPAAN',
  difficulty: 'Medium',
  icon: '😔'
},
{
  id: 'selamat-pagi',
  nameMalay: 'Selamat Pagi',
  nameEnglish: 'Good Morning',
  description: 'Sign "Good" then "Morning" (arm rising like the sun).',
  category: 'SALAM & SAPAAN',
  difficulty: 'Hard',
  icon: '🌅'
}];