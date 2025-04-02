import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const [error, setError] = useState<string>('');
  const { loginWithRedirect } = useAuth0();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      // Redirect to login after successful registration
      loginWithRedirect({
        appState: { returnTo: '/profile' },
        authorizationParams: {
          screen_hint: 'login',
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
      {error && <div className="error-message">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register('email')}
        />
        {errors.email && (
          <span className="error">{errors.email.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          {...register('username')}
        />
        {errors.username && (
          <span className="error">{errors.username.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...register('password')}
        />
        {errors.password && (
          <span className="error">{errors.password.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="firstName">First Name (Optional)</label>
        <input
          type="text"
          id="firstName"
          {...register('firstName')}
        />
        {errors.firstName && (
          <span className="error">{errors.firstName.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="lastName">Last Name (Optional)</label>
        <input
          type="text"
          id="lastName"
          {...register('lastName')}
        />
        {errors.lastName && (
          <span className="error">{errors.lastName.message}</span>
        )}
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-primary">
        {isSubmitting ? 'Registering...' : 'Register'}
      </button>

      <p className="auth-switch">
        Already have an account?{' '}
        <button
          type="button"
          onClick={() => loginWithRedirect()}
          className="link-button"
        >
          Log in
        </button>
      </p>
    </form>
  );
};