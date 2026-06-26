import { InfoBox } from '@/components/MessageBox';
import { useRenderCounter } from '@/hooks/useRenderCounter';
import { getCountriesZod } from '@/services/mockCountryApi';
// import { getCountries } from '@/services/mockCountryApi';
import type { Country } from '@/types/CountrySchema';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

type FormValues = {
  countryCode: string;
  provinceCode: string;
};

function ZodPage() {
  useRenderCounter('ReactHookFormPage');

  const [countries, setCountries] = useState<Country[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      countryCode: '',
      provinceCode: '',
    },
  });

  const selectedCountryCode = watch('countryCode');
  const selectedProvinceCode = watch('provinceCode');

  const selectedCountry = countries.find((country) => country.code === selectedCountryCode) ?? null;

  const selectedProvince =
    selectedCountry?.provinces.find((province) => province.code === selectedProvinceCode) ?? null;

  const provinces = selectedCountry?.provinces ?? [];

  const shouldShowProvinceDropdown = provinces.length > 0;

  useEffect(() => {
    const abortController = new AbortController();

    const loadCountries = async () => {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        // const responseExampleWithoutZod = await getCountries(abortController.signal);
        const response = await getCountriesZod(abortController.signal);
        setCountries(response);
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        setErrorMessage(
          error instanceof Error ? error.message : 'Unknown error loading countries.',
        );
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadCountries();

    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    if (!selectedCountryCode) {
      return;
    }

    setValue('provinceCode', '', {
      shouldValidate: false,
      shouldDirty: false,
      shouldTouch: false,
    });

    setShowResults(false);
  }, [selectedCountryCode, setValue]);

  const onSubmit = () => {
    setShowResults(true);
  };

  return (
    <>
      <h1>React Hook Form</h1>

      <InfoBox>
        <p>
          <strong>React Hook Form</strong> is used for form state management and validation.
        </p>
      </InfoBox>

      {isLoading && <p>Loading countries...</p>}
      {errorMessage && (
        <p className={'alert'} role='alert'>
          Error: {errorMessage}
        </p>
      )}

      {!isLoading && (
        <>
          <form onSubmit={handleSubmit(onSubmit)} className={'form-layout'}>
            <div>
              <label htmlFor='countryCode'>Country:</label>
            </div>
            <div>
              <select
                id='countryCode'
                {...register('countryCode', {
                  required: 'Country is required.',
                  onChange: () => setShowResults(false),
                })}
                className={'select-list'}
              >
                <option value=''>Select a country</option>

                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            {errors.countryCode && (
              <p className={'alert'} role='alert'>
                {errors.countryCode.message}
              </p>
            )}

            {shouldShowProvinceDropdown && (
              <>
                <div>
                  <label htmlFor='provinceCode'>State/Province:</label>
                </div>
                <div>
                  <select
                    id='provinceCode'
                    {...register('provinceCode', {
                      validate: (value) => {
                        if (!shouldShowProvinceDropdown) {
                          return true;
                        }

                        return value !== '' || 'State/province is required.';
                      },
                      onChange: () => setShowResults(false),
                    })}
                    className={'select-list'}
                  >
                    <option value=''>Select a state/province</option>

                    {provinces.map((province) => (
                      <option key={province.code} value={province.code}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                </div>

                {errors.provinceCode && <p role='alert'>{errors.provinceCode.message}</p>}
              </>
            )}

            <div>
              <button type='submit' disabled={!isValid}>
                Submit
              </button>
            </div>
          </form>

          {showResults && (
            <div className={'form-layout form-success'}>
              <div>
                Country: {selectedCountry?.code} {selectedCountry?.name}
              </div>

              {selectedProvince && (
                <div>
                  Province: {selectedProvince?.code} {selectedProvince?.name}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}

export default ZodPage;
