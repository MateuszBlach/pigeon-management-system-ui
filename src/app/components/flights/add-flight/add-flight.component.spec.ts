import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddFlightComponent } from './add-flight.component';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth/auth.service';
import { FlightService } from '../../../services/flight/flight.service';
import { AlertService } from '../../../services/alert/alert.service';
import { of, throwError } from 'rxjs';
import { AlertType } from '../../../models/alert.model';
import { FlightDTO } from '../../../dto/flight.dto';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddFlightComponent', () => {
  let component: AddFlightComponent;
  let fixture: ComponentFixture<AddFlightComponent>;
  let mockFlightService: jasmine.SpyObj<FlightService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<AddFlightComponent>>;
  let mockAlertService: jasmine.SpyObj<AlertService>;

  beforeEach(async () => {
    mockFlightService = jasmine.createSpyObj('FlightService', ['addFlight', 'updateFlight']);
    mockAuthService = jasmine.createSpyObj('AuthService', ['getLoggedUserId']);
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockAlertService = jasmine.createSpyObj('AlertService', ['showAlert']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, AddFlightComponent, BrowserAnimationsModule], // Add BrowserAnimationsModule
      providers: [
        { provide: FlightService, useValue: mockFlightService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: AlertService, useValue: mockAlertService },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { mode: 'add', flight: { id: 1, name: 'Test Flight' } },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFlightComponent);
    component = fixture.componentInstance;

    component.flight = {
      id: 1,
      userId: -1,
      distance: 0,
      date: new Date(2000,1,1),
      city: '',
      weather: '',
      windDirection: '',
      windSpeed: 0,
    };

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the correct mode and flight data from dialog data', () => {
    expect(component.mode).toBe('add');
    expect(component.flight).toEqual(
      { id: 1, userId: -1, distance: 0, date: new Date(2000,1,1), city: '', weather: '', windDirection: '', windSpeed: 0 }
    );
  });

  it('should call addNewFlight if mode is add on submitForm', () => {
    spyOn(component, 'addNewFlight');
    component.mode = 'add';
    component.submitForm();
    expect(component.addNewFlight).toHaveBeenCalled();
  });

  it('should call editFlight if mode is not add on submitForm', () => {
    spyOn(component, 'editFlight');
    component.mode = 'edit';
    component.submitForm();
    expect(component.editFlight).toHaveBeenCalled();
  });

  describe('addNewFlight', () => {
    it('should call flightService.addFlight and close the dialog with true on success', () => {
      const mockFlight = { id: 1, name: 'Test Flight', userId: 123 };
      mockAuthService.getLoggedUserId.and.returnValue(123);
      mockFlightService.addFlight.and.returnValue(of(mockFlight as unknown as FlightDTO)); // Ensure type compatibility

      component.addNewFlight();

      expect(mockAuthService.getLoggedUserId).toHaveBeenCalled();
      expect(mockFlightService.addFlight).toHaveBeenCalledWith(component.flight);
      expect(mockDialogRef.close).toHaveBeenCalledWith(true);
    });

    it('should call alertService.showAlert and close dialog with false on error', () => {
      mockAuthService.getLoggedUserId.and.returnValue(123);
      mockFlightService.addFlight.and.returnValue(throwError(() => new Error('Error')));

      component.addNewFlight();

      expect(mockAlertService.showAlert).toHaveBeenCalledWith(
        AlertType.Error,
        'Nie udało się dodać nowego lotu.'
      );
      expect(mockDialogRef.close).toHaveBeenCalledWith(false);
    });
  });

  it('should close the dialog on close', () => {
    component.close();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
