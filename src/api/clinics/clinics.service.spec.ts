import { Repository } from "typeorm";
import { Mock, beforeEach, describe, expect, it, vi } from "vitest";

import { Clinic } from "../../database/entities/Clinic.entity";
import clinicsMockData from "../../database/seeds/data/clinics.json";
import { NotFoundException } from "../../utils/exceptions";

import { ClinicsService } from "./clinics.service";

describe("ClinicsService", () => {
  let clinicsService: ClinicsService;
  let mockClinicRepository: Partial<Repository<Clinic>>;

  beforeEach(() => {
    mockClinicRepository = {
      find: vi.fn(),
      findOneBy: vi.fn(),
      create: vi.fn(),
      save: vi.fn(),
      remove: vi.fn(),
    };

    clinicsService = new ClinicsService(
      mockClinicRepository as Repository<Clinic>,
    );
  });

  describe("getAllClinics", () => {
    it("should return all clinics", async () => {
      (mockClinicRepository.find as Mock).mockResolvedValue(clinicsMockData);

      const result = await clinicsService.getAllClinics();

      expect(result).toEqual(clinicsMockData);
      expect(mockClinicRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe("getClinicById", () => {
    it("should return a clinic by ID", async () => {
      const clinic = clinicsMockData[0];
      (mockClinicRepository.findOneBy as Mock).mockResolvedValue(clinic);

      const result = await clinicsService.getClinicById(clinic.id);

      expect(result).toEqual(clinic);
      expect(mockClinicRepository.findOneBy).toHaveBeenCalledWith({
        id: clinic.id,
      });
    });

    it("should throw NotFoundException if clinic not found", async () => {
      (mockClinicRepository.findOneBy as Mock).mockResolvedValue(null);

      await expect(
        clinicsService.getClinicById("non-existent-id"),
      ).rejects.toThrow(NotFoundException);
      expect(mockClinicRepository.findOneBy).toHaveBeenCalledWith({
        id: "non-existent-id",
      });
    });
  });

  describe("createClinic", () => {
    it("should create and return a new clinic", async () => {
      const inputData = { name: "New Clinic" };
      const expectedOutput = { id: "new-id", ...inputData } as Clinic;

      (mockClinicRepository.create as Mock).mockReturnValue(inputData);
      (mockClinicRepository.save as Mock).mockResolvedValue(expectedOutput);

      const result = await clinicsService.createClinic(inputData);

      expect(result).toEqual(expectedOutput);
      expect(mockClinicRepository.create).toHaveBeenCalledWith(inputData);
      expect(mockClinicRepository.save).toHaveBeenCalledWith(inputData);
    });
  });
});
