// Generated by dts-bundle v0.7.2

/**
  * @description Хэлпер для сериализации классов, имеющих поля с навешанным декоратором JsonName. Сериализует только те
  *     поля, у которых есть декоратор и задано начальное значение.
  * @param model - экземпляр класса, который надо превратить в данные для отправки серверу по JSONRPC
  * @returns {{}} - обычный объект JS
  */
export function serialize(model: {
    [key: string]: any;
}): object;

export function JsonArray(proto: any, name?: string): (target: object, propertyKey: string) => void;

export function JsonMeta(): (target: object, propertyKey: string) => void;

export function JsonName<T>(name?: string, serialize?: (value: T, instance: any) => any, deserialize?: (rawValue: any, rawData?: any) => T): (target: object, propertyKey: string) => void;

export function JsonNameReadonly<T>(name?: string, deserialize?: (rawValue: any, rawData?: any) => T): (target: object, propertyKey: string) => void;

export function JsonStruct(name?: string): (target: object, propertyKey: string) => void;

export function JsonNameLate<T>(name?: string, serialize?: (value: T, instance: any) => any, deserialize?: (rawValue: any, rawData?: any) => T): (target: object, propertyKey: string) => void;

/**
  * @description Хэлпер для разбора данных, пришедших по JSONRPC от сервера в нашу модель
  * @param data - данные от сервера
  * @param cls - класс, в экземпляр которого надо превратить данные
  * @returns {T} - экземпляр класса cls, заполненный данными
  */
export function deserialize<T>(data: any, cls: {
    new (...args: Array<any>): T;
}): T;

