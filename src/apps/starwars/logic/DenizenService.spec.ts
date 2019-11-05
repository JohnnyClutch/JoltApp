import { NO_ERRORS_SCHEMA } from '@angular/core';
import { inject, async, TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, Http, RequestOptions, BaseRequestOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ConnectionBackend } from '@angular/http';
import { SessionStorageService } from '../utils';
import { LocationStrategy, HashLocationStrategy, Location, PlatformLocation } from '@angular/common';
import { BrowserPlatformLocation } from '@angular/platform-browser/src/browser/location/browser_platform_location';
import { DenizenService } from './DenizenService';
import { DenizenProviderFactory } from '../denizenProviderFactory';
import { Denizen, PageInfo } from '../models';

//declare let jasmine: any;
// declare let mockPromises: any;

//
//expect(fn).toThrow(e);
//expect(instance).toBe(instance);
//expect(mixed).toBeDefined();
//expect(mixed).toBeFalsy();
//expect(number).toBeGreaterThan(number);
//expect(number).toBeLessThan(number);
//expect(mixed).toBeNull();
//expect(mixed).toBeTruthy();
//expect(mixed).toBeUndefined();
//expect(array).toContain(member);
//expect(string).toContain(substring);
//expect(mixed).toEqual(mixed);
//expect(mixed).toMatch(pattern);
//


describe('Denizen Service testing...', () => {

	let denizenProviders: any[] = [
		{ provide: DenizenService, useClass: DenizenService },
		{ provide: 'window', useValue: window },
		{ provide: XHRBackend, useClass: MockBackend },
		Location
	];

	let providers = DenizenProviderFactory.marshallProviders(true);
	providers.forEach(
		(provider: any) => {
			denizenProviders.push(provider);
		}
	);
	providers.length = 0;

	let sessionStorage = new SessionStorageService(window);
	denizenProviders.push( { provide: SessionStorageService, useValue: sessionStorage } );

	let denizenService: DenizenService = null;
	let fixture: ComponentFixture<DenizenService>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [ RouterTestingModule ],
			providers: denizenProviders
		})
		.compileComponents();
	}));

	beforeEach(inject([DenizenService], _denizenService => {
		denizenService = _denizenService;
	}));

	it('should retrieve denizens', done => {

		let pageInfo: PageInfo<Denizen> = new PageInfo<Denizen>();
		denizenService.getDenizens(pageInfo).subscribe(
			(pageInfo) => {
				expect(pageInfo.results.length).toBeGreaterThan(0);
				done();
			},
			(error) => {
			}
		);
	}, 10000);

});

