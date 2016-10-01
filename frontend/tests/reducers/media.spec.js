import expect from 'expect'
import { UPLOAD_MEDIA, UPDATE_UPLOAD_INFO } from '../../src/actions'
import media from '../../src/reducers/media'

const file = {
        lastModified: 1474569734192,
        lastModifiedDate: 'Wed Jul 28 1993 14:39:07 GMT-0600 (PDT)',
        name: 'a-photo.jpg',
        preview: 'blob:http%3A//localhost%3A3000/499b3f87-da39-477a-8f0b-7f097e4f0aa1',
        size: 73669,
        type: 'image/jpeg',
        webkitRelativePath: ''
      }

describe('Media Reducer', () => {
  it('Should return an object with corresponding files and info properties on ' + UPLOAD_MEDIA + ' action', () => {
    const state = {},
          action = {
            type: UPLOAD_MEDIA,
            media: [file]
          },
          actual = media(state, action),
          expected = {
            files: [file],
            info: {
              name: 'a-photo',
              description: '',
              tags: [],
              isPrivate: false,
              location: ''
            }
          }

    expect(actual).toEqual(expected)
  })

  it('Should update info on ' + UPDATE_UPLOAD_INFO + ' action', () => {
    const state = {
            files: [file],
            info: {
              name: 'a-photo',
              description: '',
              tags: [],
              isPrivate: false,
              location: ''
            }
          },
          action = {
            type: UPDATE_UPLOAD_INFO,
            field: 'description',
            value: 'This is a photo'
          },
          actual = media(state, action),
          expected = {
            files: [file],
            info: {
              name: 'a-photo',
              description: 'This is a photo',
              tags: [],
              isPrivate: false,
              location: ''
            }
          }

    expect(actual).toEqual(expected)
  })
})
