/*
 * Knowage, Open Source Business Intelligence suite
 * Copyright (C) 2016 Engineering Ingegneria Informatica S.p.A.
 *
 * Knowage is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Knowage is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

package it.eng.spagobi.tools.dataset.common.similarity;

import java.util.HashSet;
import java.util.Set;

public class Similarity implements Comparable<Similarity> {

	private final Set<Field> fields;
	private final double coefficient;

	public Similarity() {
		this(0.0);
	}

	public Similarity(double coefficient) {
		this(new HashSet<Field>(), coefficient);
	}

	public Similarity(Set<Field> fields, double coefficient) {
		this.fields = fields;
		this.coefficient = coefficient;
	}

	public Set<Field> getFields() {
		return fields;
	}

	public boolean addField(Field field) {
		return fields.add(field);
	}

	public double getCoefficient() {
		return coefficient;
	}

	@Override
	public int compareTo(Similarity other) {
		return Double.compare(coefficient, other.coefficient);
	}
}
