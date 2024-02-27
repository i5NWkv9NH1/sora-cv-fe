export const json = {
  type: 'VContainer',
  data: {
    id: '4400936b-6158-4943-9dc8-a04c57e1af46',
    items: [
      {
        type: 'VCard',
        data: {
          id: '26b3f355-2f65-4aae-b9fd-609779f24fdd',
          title: 'A card example',
          subtitle: 'A subtitle',
          items: [
            {
              type: 'VBtn',
              data: {
                id: '4400936b-6158-4943-9dc8-a04c57e1af46',
                text: 'Button text',
                variant: 'tonal',
                icon: 'mdi-heart',
                to: '/',
              },
            },
          ],
        },
      },
      {
        type: 'VDivider',
        data: {
          id: '4400936b-6158-4943-9dc8-a04c57e1af46',
          marginX: 3,
        },
      },
      {
        type: 'VCard',
        data: {
          id: '4400936b-6158-4943-9dc8-a04c57e1af46',
          title: 'Title',
          headline: 'Month ## - Month ##, ####',
          copy: 'A really long text....',
          image: {
            url: 'https://i.stack.imgur.com/y9DpT.jpg',
          },
        },
      },
      {
        type: 'VContainer',
        data: {
          id: 'd76e3a5f-01ad-46f6-a45d-3ad9699ecf99',
          fluid: true,
          embeddedView: {
            type: 'VTextField',
            data: {
              id: '26b3f355-2f65-4aae-b9fd-609779f24fdd',
              label: 'Input',
              type: 'password',
              placeholder: 'Password',
              isRequired: false,
              minCharactersAllowed: 1,
              maxCharactersAllowed: 100,
              validations: [
                {
                  regexType: 'eightOrMoreCharacters',
                  regexErrorCopy: 'Use 8 or more characters',
                },
              ],
            },
          },
        },
      },
    ],
  },
}
