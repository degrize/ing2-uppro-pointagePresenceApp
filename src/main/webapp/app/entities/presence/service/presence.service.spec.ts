import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPresence } from '../presence.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../presence.test-samples';

import { PresenceService, RestPresence } from './presence.service';

const requireRestSample: RestPresence = {
  ...sampleWithRequiredData,
  date: sampleWithRequiredData.date?.toJSON(),
};

describe('Presence Service', () => {
  let service: PresenceService;
  let httpMock: HttpTestingController;
  let expectedResult: IPresence | IPresence[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PresenceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Presence', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const presence = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(presence).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Presence', () => {
      const presence = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(presence).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Presence', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Presence', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Presence', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addPresenceToCollectionIfMissing', () => {
      it('should add a Presence to an empty array', () => {
        const presence: IPresence = sampleWithRequiredData;
        expectedResult = service.addPresenceToCollectionIfMissing([], presence);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(presence);
      });

      it('should not add a Presence to an array that contains it', () => {
        const presence: IPresence = sampleWithRequiredData;
        const presenceCollection: IPresence[] = [
          {
            ...presence,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addPresenceToCollectionIfMissing(presenceCollection, presence);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Presence to an array that doesn't contain it", () => {
        const presence: IPresence = sampleWithRequiredData;
        const presenceCollection: IPresence[] = [sampleWithPartialData];
        expectedResult = service.addPresenceToCollectionIfMissing(presenceCollection, presence);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(presence);
      });

      it('should add only unique Presence to an array', () => {
        const presenceArray: IPresence[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const presenceCollection: IPresence[] = [sampleWithRequiredData];
        expectedResult = service.addPresenceToCollectionIfMissing(presenceCollection, ...presenceArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const presence: IPresence = sampleWithRequiredData;
        const presence2: IPresence = sampleWithPartialData;
        expectedResult = service.addPresenceToCollectionIfMissing([], presence, presence2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(presence);
        expect(expectedResult).toContain(presence2);
      });

      it('should accept null and undefined values', () => {
        const presence: IPresence = sampleWithRequiredData;
        expectedResult = service.addPresenceToCollectionIfMissing([], null, presence, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(presence);
      });

      it('should return initial array if no Presence is added', () => {
        const presenceCollection: IPresence[] = [sampleWithRequiredData];
        expectedResult = service.addPresenceToCollectionIfMissing(presenceCollection, undefined, null);
        expect(expectedResult).toEqual(presenceCollection);
      });
    });

    describe('comparePresence', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePresence(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.comparePresence(entity1, entity2);
        const compareResult2 = service.comparePresence(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.comparePresence(entity1, entity2);
        const compareResult2 = service.comparePresence(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.comparePresence(entity1, entity2);
        const compareResult2 = service.comparePresence(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
