export type TSerializeFunc<T> = (value: T, instance: any) => any;
export type TDeserializeFunc<T> = (rawValue: any, rawData?: any) => T;

export interface PropertyMetadata {
    /**
     * Ключ поля в нативном объекте
     */
    propertyKey: string;

    /**
     * Ключ в сериализованном виде
     */
    rawKey: string;

    /**
     * Функция-сериализатор, превращает нативный экземпляр в сериализованный POJO
     */
    serialize?: TSerializeFunc<any>;

    /**
     * Функция-десериализатор, превращает POJO в экземпляр данного класса
     */
    deserialize?: TDeserializeFunc<any>;

    /**
     * Приватный флаг о том, что в поле хранится структура(другой экземпляр нативного класса)
     */
    isStruct?: boolean;

    /**
     * Приватный флаг о том, что поле надо десериализовать после десериализации всех остальных полей, отложенно
     */
    isLate?: boolean;
}