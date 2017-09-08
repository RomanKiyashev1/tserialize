import { expect } from 'chai';
import { serializeValue, assignSerializedValueToResult } from './../../src/serialize/helpers';
import { PropertyMetadata } from './../../src/meta-store';
import { ParentKey } from './../../src/metadata-key';
import { JsonName } from './../..';
import 'reflect-metadata';

describe('serializeValue helper', () => {
    const defaultMeta: PropertyMetadata = {
        propertyKey: 'prop',
        targetKey: 'prop',
        serialize: null,
        deserialize: null,
        struct: false
    };

    class TestClass {
        @JsonName()
        prop: number = 1;

        toServer(): any {
            return {prop: this.prop};
        }
    }

    describe('serializeValue helper', () => {
        it('must return undefined without metadata => undefined', () => {
            expect(serializeValue(null, 1, 1)).to.be.undefined;
        });

        it('must serialize null struct with null serializer => null', () => {
            const meta = {...defaultMeta, ...{ struct: true }};

            expect(serializeValue(meta, null, null)).to.be.null;
        });

        it('must serialize not null struct in them context', () => {
            const t = new TestClass();
            const meta = {...defaultMeta, ...{struct: true}};
            expect(serializeValue(meta, t, null)).to.deep.equal({prop: 1});
        });

        it('must serialize not null struct with default serializer', () => {
            const t = new TestClass();
            t.toServer = null;
            const meta = {...defaultMeta, ...{struct: true}};
            expect(serializeValue(meta, t, null)).to.deep.equal({prop: 1});
        });

        it('must call custom serializer in them context', () => {
            const meta = {...defaultMeta, ...{serialize: (value, instance) => value + instance.foo}};
            const instance = {foo: 1, bar: 2};
            expect(serializeValue(meta, instance.bar, instance)).to.be.equal(3);
        });

        it('must call custom serializer which return null', () => {
            const meta = {...defaultMeta, ...{serialize: () => null}};
            expect(serializeValue(meta, 1, null)).to.be.null;
        });

        it('must serialize with custom serializer', () => {
            const meta = {...defaultMeta, ...{serialize: () => 1}};
            expect(serializeValue(meta, 2, null)).to.be.equal(1);
        });

        it('must serialize value without serializer', () => {
            const meta = defaultMeta;
            expect(serializeValue(meta, 2, null)).to.be.equal(2);
        });
    });

    describe('assignSerializedValueToResult helper', () => {
        it('must not assign null value to result', () => {
            const meta = {...defaultMeta};
            const obj = {};
            assignSerializedValueToResult(meta, null, obj);
            expect(obj).to.deep.equal({});
        });

        it('must not assign undefined value to result', () => {
            const meta = {...defaultMeta};
            const obj = {};
            assignSerializedValueToResult(meta, undefined, obj);
            expect(obj).to.deep.equal({});
        });

        it('must assign value to key', () => {
            const meta = {...defaultMeta};
            const obj = {};
            assignSerializedValueToResult(meta, 1, obj);
            expect(obj).to.deep.equal({prop: 1});
        });

        it('must assign struct to key', () => {
            const meta = {...defaultMeta};
            const obj = {};
            assignSerializedValueToResult(meta, {foo: 1}, obj);
            expect(obj).to.deep.equal({prop: {foo: 1}});
        });

        it('must assign struct to parent', () => {
            const meta = {...defaultMeta, targetKey: ParentKey};
            const obj = {};
            assignSerializedValueToResult(meta, {foo: 1}, obj);
            expect(obj).to.deep.equal({foo: 1});
        });
    });
});
