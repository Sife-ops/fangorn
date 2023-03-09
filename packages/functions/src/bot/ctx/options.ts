interface Option {
  name: string;
  type: number;
  id?: string;
  value?: string | number;
  options?: Option[];
}

export class Options {
  private interactionBody;

  constructor(c: { interactionBody: any }) {
    this.interactionBody = c.interactionBody;
  }

  getFlatOptions(): Option[][] {
    const recurse = (options: Option[]): Option[][] => {
      if (!options || options.length < 1) return [];
      const firstOption = options[0];
      if (firstOption.options && firstOption.options.length > 0) {
        return [[firstOption], ...recurse(firstOption.options)];
      }
      return [options];
    };

    const {
      data: { name, options, type, id },
    } = this.interactionBody;

    return [
      [
        {
          name,
          options,
          type,
          id,
        },
      ],
      ...recurse(options),
    ];
  }

  getCommand(index: number): Option {
    return this.getFlatOptions()[index][0];
  }

  getCommandId(index: number): string {
    return this.getCommand(index).id!;
  }

  getCommandName(index: number): string {
    return this.getCommand(index).name;
  }

  getOptionValue(optionName: string): any {
    const flatOptions = this.getFlatOptions();
    const value = flatOptions[flatOptions.length - 1].find(
      (option) => option.name === optionName
    )?.value;
    // if (!value) throw new Error(`option not found: "${optionName}"`);
    return value;
  }
}
