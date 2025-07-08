
import { JSONParser } from 'vanilla-jsoneditor';


export function purifyJson(str: string) {
  str = str.replaceAll('#(baseUrl)', 'https://20min.fun/')

  str = str.replaceAll('#(book.title)', 'Ведьмак. Перекресток Воронов')
  str = str.replaceAll('#(book.authorFirstName)', 'Анжей')
  str = str.replaceAll('#(book.authorLastName)', 'Сапковский')
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


  const re = /\#for\((?:.+?)\):(.+?)\#endfor/sgmi
  str = str.replace(re, "$1");

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