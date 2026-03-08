
import { JSONParser } from 'vanilla-jsoneditor';


export function purifyJson(str: string) {
  str = str.replaceAll('#(baseUrl)', 'https://20min.fun/')

  str = str.replaceAll('#(book.user.photoUrl)', 'https://bookreader.hb.ru-msk.vkcloud-storage.ru/users/9AFCA646-BF56-4068-B3DC-63B360D79538.jpg')
  str = str.replaceAll('#(book.user.login)', 'digestedbook')

  str = str.replaceAll('#(role.author.photoUrl)', 'https://bookreader.hb.ru-msk.vkcloud-storage.ru/authors/andrzej_sapkowski.jpg')
  str = str.replaceAll('#(role.author.firstName)', 'Анжей')
  str = str.replaceAll('#(role.author.lastName)', 'Сапковский')
  str = str.replaceAll('#(role.typeString)', 'Автор')

  str = str.replaceAll('#(book.section.title)', 'Аудиокниги')
  str = str.replaceAll('#(book.section.coverUrl)', 'https://bookreader.hb.ru-msk.vkcloud-storage.ru/images/bookreader_transparent.png')
  

  str = str.replaceAll('#(book.title)', 'Ведьмак. Перекресток Воронов')
  str = str.replaceAll('#(book.mediaUrl)', 'https://bookreader.hb.ru-msk.vkcloud-storage.ru/audiobooks/witcher/witcher.m4b')
  str = str.replaceAll('#(book.textLink)', 'https://20min.fun/')
  str = str.replaceAll('#(book.description)', 'На этот раз мэтр польского фэнтези обращается к юности Геральта, когда тот лишь начинал свой путь ведьмака и сталкивался со множеством испытаний. С двумя руническими мечами за спиной он охотится на чудовищ, спасает невинных девушек и приходит на помощь несчастным влюблённым. Везде и всюду он пытается следовать неписаному кодексу, усвоенному от своих учителей и наставников. Но, как это часто бывает, жизнь щедра на разочарования ― юношеский идеализм то и дело разбивается о суровую действительность. Сага продолжается. Ведь история не знает конца…')
  str = str.replaceAll('#(book.previewUrl)', 'https://bookreader.hb.ru-msk.vkcloud-storage.ru/audiobooks/witcher/witcher_preview.jpg')
  str = str.replaceAll('#(book.coverUrl)', 'https://bookreader.hb.ru-msk.vkcloud-storage.ru/audiobooks/witcher/witcher.jpg')
  str = str.replaceAll('#(book.author)', 'Анжей Сапковский')

  str = str.replaceAll('#(title)', 'Аудиокниги')
  str = str.replaceAll('#(description)', 'Подборка аудиокниг')
  str = str.replaceAll('#(section.title)', 'Рассказы')
  str = str.replaceAll('#(section.name)', 'stories')
  str = str.replaceAll('#(section.coverUrl)', 'https://bookreader.hb.ru-msk.vkcloud-storage.ru/book_mini.png')

  str = str.replaceAll('#(chapter.title)', 'Глава 1')
  str = str.replaceAll('#(chapter.mediaUrl))', 'https://bookreader.hb.ru-msk.vkcloud-storage.ru/audiobooks/cepochka_raspada/01.mp3')

  

  const re1 = /\#for\((?:.+?)\):(.+?)\#endfor/sgmi
  str = str.replace(re1, "$1");

  const re2 = /\#if\((?:.+?)\):(.+?)\#else:(.+?)\#endif/sgmi
  str = str.replace(re2, "$1");

  const re3 = /\#if\((?:.+?)\):(.+?)\#endif/sgmi
  str = str.replace(re3, "$1");

  return str
}

export class LeafJSONParser implements JSONParser {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  parse(text: string, reviver?: ((this: unknown, key: string, value: unknown) => unknown) | null): unknown {
    return JSON.parse(purifyJson(text))
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  stringify(value: unknown, replacer?: ((this: unknown, key: string, value: unknown) => unknown) | Array<number | string> | null, space?: string | number): string | undefined {
    return JSON.stringify(value)
  }
}